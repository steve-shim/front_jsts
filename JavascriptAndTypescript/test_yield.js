function makeInfiniteEnergyGenerator(){
    let energy = 0;
    return function (booster = 0){
        if(booster){
            energy += booster;
        } else {
            energy++;
        }

        return energy;
    };
}

function * infiniteEnergyGenerator() {
    let energy = 1;
    while(true){
        const booster = yield energy;

        if(booster){
            energy += booster;
        } else {
            energy++;
        }
    }
}

const energy = makeInfiniteEnergyGenerator();
const energy22 = makeInfiniteEnergyGenerator();

for(let i =0; i<5; i++){
    console.log(energy());   // 1 2 3 4 5
    console.log(energy22()); // 1 2 3 4 5
}

console.log(energy(5));  // 10
console.log(energy22()); // 6


const energyGenerator = infiniteEnergyGenerator();

for(let i =0; i<5; i++){
    console.log(energyGenerator.next());
}
console.log(energyGenerator.next(5))