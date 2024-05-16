import { initializeApp } from "firebase/app";
import { DatabaseReference, getDatabase, ref, get, push, remove, update, onValue, onChildAdded, onChildChanged, onChildMoved, onChildRemoved, onDisconnect, DataSnapshot} from "firebase/database";
import { Observable, Subscription, generate } from "rxjs";
import AbstractDataObject from "../models/abstractDataObject.DTO.js";
import firebaseConfig from "../config/firebaseConfig.js";



// Connect to Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

const generateRef = (...path: string[]):DatabaseReference => {
    return ref(db, "/" + path.join("/"));
}


export const getData = async(...path: string[]): Promise<null |object> => {
    const ref = generateRef(...path)
    
    return get(ref).then((snapshot) => {
        if(snapshot.exists())
            return snapshot.val();
        else
            throw new Error(`no collection with path ${path.join("/")}`)
    })
}

interface SubscriptionType {
    onValue:        boolean,
    onChildAdded:   boolean,
    onChildChanged: boolean,
    onChildMoved:   boolean,
    onChildRemoved: boolean,
    onDisconnect:   boolean,
}
export const getDataSubscription = async(options: SubscriptionType, ...path: string[]): Promise<Observable<AbstractDataObject>|null> => {

    return new Observable<AbstractDataObject>((subscriber) => {
        const reference = generateRef(...path)

        const callback = (snapshot:DataSnapshot) => {
            subscriber.next(snapshot.val())
        }

        const subscribe = onValue(reference, callback);
    })

}

export const updateData = async (newData:Partial<AbstractDataObject>, ...path: string[]): Promise<void> => {
    const reference = generateRef(...path)
    newData.updatedAt = Date.now()

    
    update(reference, {
        newData
    }).then((result) => {
        console.log(`successfully updated with path ${path.join("/")}`)
    }).catch((err) => {
        throw new Error(`update failed with path: ${path.join("/")}`)
    })
}

const validateAbstractDataObject = (obj: object): obj is AbstractDataObject => {
    if(Object.keys(obj).some((key) => key == "id")) return true
    return false
}

export const createData = async (newData: AbstractDataObject, ...path: string[]): Promise<string|null> => {
    const reference = generateRef(...path)

    newData.createdAt = Date.now()
    newData.updatedAt = Date.now()

    const pushData = JSON.parse(JSON.stringify(newData));

    return push(reference, {
        ...newData
    }).then((data) => {
        console.log(`successfully created with path: ${path.join("/")}`)
        return data.key
    }).catch((err) => {
        throw new Error(`create failed with path: ${path.join("/")}`)
    });

    
}

export const deleteData = async (...path: string[]): Promise<void> => {
    const reference = generateRef(...path)
    remove(reference).then((result) => {
        console.log(`successfully deleted with path: ${path.join("/")}`)
    }).catch((err) => {
        throw new Error(`delete failed with path: ${path.join("/")}`)
    })
}