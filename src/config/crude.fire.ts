

import {
    collection,
    doc, getDoc,
} from "firebase/firestore";
import { firestore } from "./firebase.config";


class FirebaseServiceCrude {
    itemsMenuCollection = collection(firestore, "equipment");

    getItemsById = async (id: string) => {
        const item = await getDoc(doc(this.itemsMenuCollection, id));
        return item.data();
    };


}

export const fireCrude = new FirebaseServiceCrude();