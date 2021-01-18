// Walk through the HashMap implementation in the curriculum and understand it well. 
// Then write a HashMap class and its core functions with open addressing as the collision 
// resolution mechanism.

// Export your HashMap module

// Create a .js file called HashMaps_drills. In the file import the HashMap module. 

// Create a function called main()

// Inside your main() function, create a hash map called lotr.

// For your hash map that you have created, set the MAX_LOAD_RATIO = 0.5 and SIZE_RATIO = 3.

// Add the following items to your hash map: {"Hobbit": "Bilbo"}, {"Hobbit": "Frodo"},
// {"Wizard": "Gandalf"}, {"Human": "Aragorn"}, {"Elf": "Legolas"}, {"Maiar": "The Necromancer"},
// {"Maiar": "Sauron"}, {"RingBearer": "Gollum"}, {"LadyOfLight": "Galadriel"}, {"HalfElven": "Arwen"},
// {"Ent": "Treebeard"}

// Print your hash map and notice the length and items that are hashed in your hash map. 

// Have you hashed all the items you were asked to?

// Retrieve the value that is hashed in the key "Maiar" and Hobbit.

// What are the values of Maiar and Hobbit that you have? Is there a discrepancy? Explain your answer.

// What is the capacity of your hash table after you have hashed all the above items? Explain your answer.


class HashMap{
    constructor(initialCapacity = 8) {
        this.length = 0
        this._hashTable = []
        this._capacity = initialCapacity
        this._deleted = 0
    }

    get(key) {
        const index = this._findSlot(key)

        if(this._hashTable[index] === undefined) {
            throw new Error('Key Error')
        }
        return this._hashTable[index].value
    }

    set(key, value) {
        const loadRatio = (this.length + this.deleted + 1) / this._capacity

        if(loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO)
        }

        const index = this._findSlot(key)

        if(!this._hashTable[index]) {
            this.length++
        }
        this._hashTable[index] = {
            key,
            value,
            DELETED: false
        }
    }

    _findSlot(key) {
        const hash = HashMap._hashString(key)
        const start = hash % this._capacity

        for(let i = start; i < start + this._capacity; i++) {
            const index = i % this._capacity
            const slot = this._hashTable[index]
        
            if(slot === undefined || (slot.key === key && !slot.DELETED)) {
                return index
            }
        }
    }

    _resize(size) {
        const oldSlots = this._hashTable
        this._capacity = size

        this.length = 0
        this._deleted = 0
        this._hashTable = []

        for(const slot of oldSlots) {
            if(slot !== undefined && !slot.DELETED) {
                this.set(slot.key, slot.value)
            }
        }
    }

    delete(key) {
        const index = this._findSlot(key)
        const slot = this._hashTable[index]

        if(slot === undefined) {
            throw new Error('Key Error')
        }
        slot.DELETED = true
        this.length--
        this.deleted++
    }


    static _hashString(string) {
        let hash = 5381

        for(let i = 0; i < string.length; i++) {
            hash = (hash << 5) + hash + string.charCodeAt(i)
            hash = hash & hash
        }
        return hash >>> 0
    }
}