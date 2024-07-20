class Type {
    constructor(name, ability) {
        this.name = name;
        this.ability = ability;
    }

    describe() {
        //console.log(`${this.name} has the ability: ${this.ability}`)
        return `${this.name} has the ability: ${this.ability}`;
    }
}

class Creature {
    constructor(name) {
        this.name = name;
        this.types = [];
    }

    addType(type) {
        if (type instanceof Type) {
            this.types.push(type);
        } else {
            throw new Error(`You can only add an instance of Type. Argument is not a type: ${type}`);
        }
    }

    describe() {
        return `${this.name} has ${this.types.length} types.`;
    }
}

class Menu { // what drives the application and our choices
    constructor() {
        this.creatures = [];
        this.selectedCreature = null; // manage one creature at a time
    }

    start() { // entry point to application
        let selection = this.showMainMenuOptions(); 
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createCreature();
                    break;
                case '2':
                    this.viewCreature();
                    break;
                case '3':
                    this.deleteCreature();
                    break;
                case '4':
                    this.displayCreatures();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
0) exit
1) create a new creature
2) view a creature
3) delete a creature
4) display all creatures
        `);
    }

    showCreatureMenuOptions(creatureInfo) {
        return prompt(`
0) back
1) add a new type
2) delete a type
-----------------
${creatureInfo}
        `);
    }

    displayCreatures() {
        let creatureString = '';
        for (let i = 0; i < this.creatures.length; i++) {
            creatureString += i + ') ' + this.creatures[i].name + '\n';
        }
        alert(creatureString);
    }

    createCreature() {
        let name = prompt('Enter name for new creature: ');
        this.creatures.push(new Creature(name));
    }

    viewCreature() {
        let index = prompt("Enter the index of the creature that you want to view:");
        if (index > -1 && index < this.creatures.length) {
            this.selectedCreature = this.creatures[index];
            let description = 'Creature Name: ' + this.selectedCreature.name + '\n';
            description += ' ' + this.selectedCreature.describe() + '\n ';
            for (let i = 0; i < this.selectedCreature.types.length; i++) {
                description += i + ') ' + this.selectedCreature.types[i].describe() + '\n';
            }
            let selection1 = this.showCreatureMenuOptions(description);
            switch (selection1) {
                case '1':
                    this.createType();
                    break;
                case '2':
                    this.deleteType();
            }
        } // validate user input
    }

    deleteCreature() {
        let index = prompt('Enter the index of the creature that you wish to delete: ');
        if (index > -1 && index < this.creatures.length) {
            this.creatures.splice(index, 1);
        }
    }

    createType() {
        let name = prompt('Enter name for new type: ');
        let ability = prompt('Enter ability for new type: ');
        this.selectedCreature.addType(new Type(name, ability));
    }

    deleteType() {
        let index = prompt('Enter the index of the type that you wish to delete: ');
        if (index > -1 && index < this.selectedCreature.types.length) {
            this.selectedCreature.types.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();