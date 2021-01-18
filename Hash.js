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

        const index = this._findSlot(key)   // find slot where this key should be in

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

        this.length = 0     // reset length - gets rebuilt as items are added back
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
            // Bitwise left shift with 5 0s - similar to hash*31, 31 being the decent prime number
            // but bit shifting is faster way to do this, tradeoff is understandability
            hash = (hash << 5) + hash + string.charCodeAt(i)    // convert hash to 32-bit integer
            hash = hash & hash
        }
        return hash >>> 0      // make sure hash is unsigned - meaning non-negative number
    }
}

module.exports = HashMap