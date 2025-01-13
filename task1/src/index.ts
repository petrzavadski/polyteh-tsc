import {userArray} from './users'  
import {usersInfoArray} from './userInfo' 

interface userStructure {
    userid: string,
    name: string,
    gender: string
}

interface userStructureNew {
    name: string,
    position: string | undefined,
    age: number | undefined,
    gender: string
}

function getAge(name: string) {
    for (let i=0; i < usersInfoArray.length; i++){
    if (usersInfoArray[i].name == name) return usersInfoArray[i].age;
    } 
}

function getPosition(name: string) {
    for (let i=0; i < usersInfoArray.length; i++){
    if (usersInfoArray[i].name == name) return usersInfoArray[i].organization.position;
    } 
}

function getUsersJobPositions(usersArray: userStructure[]): userStructureNew[] {
    let newArr = usersArray.map(item=> {return {
        name : item.name,
        position: getPosition(item.name),
        age: getAge(item.name),
        gender: item.gender
   }
    });
        
    return  newArr;
     }

const usersPositions = getUsersJobPositions(userArray); 
// в users должен записаться новый массив 

console.log('userPositions', usersPositions);