import Datastore from 'react-native-local-mongodb';

const usersStorageKey = "Users";
const activitiesStorageKey = "Activities";


class DB extends Datastore {
    constructor(options) {
        super(options);
    }

    static protectedCallback(callback) { //returns the given function but with added check for error
        return ((err, ...args) => {
            if(err) throw err;

            if(callback)
                callback(...args);
        })
    }


    /*----------Functions analogous to datastore methods but with protected callbacks----------*/
    //Allows you to ignore database loading and error checks
    onLoad(callback) {
        this.loadDatabase( DB.protectedCallback(callback) );
    }

    get(query, callback) {
        this.onLoad( () => { this.find(query, DB.protectedCallback(callback)) } );
    }

    getOne(query, callback) {
        this.onLoad( ()=> {this.findOne(query, DB.protectedCallback(callback))} );
    }

    upload(toLoad, callback) {
        this.onLoad( ()=> {this.insert(toLoad, DB.protectedCallback(callback))} )
    }

    set(query, update, callback) {
        this.onLoad( ()=> this.update(query, update, DB.protectedCallback(callback)) );
    }

    push(query, array, element, callback) {
        this.onLoad( ()=> this.update(query, { $push: {[array]: element} }, DB.protectedCallback(callback)) );
    }

}

export const usersdb = new DB({ filename: usersStorageKey });
export const activitiesdb = new DB({ filename: activitiesStorageKey });

