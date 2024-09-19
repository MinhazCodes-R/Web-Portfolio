
var layoutboolean = true;

document.querySelector(".avater").addEventListener('click',()=>{
    //naturaly hidden
    document.querySelector("#phoneview").classList.toggle('hidden');
    document.querySelector("#phoneview").classList.toggle('show');

    document.querySelector("#profilepicture").classList.toggle('margclose');
    document.querySelector("#profilepicture").classList.toggle('margshow');
    //For top buttons

    document.querySelector("#buttonsmade01").classList.toggle('margclose');
    document.querySelector("#buttonsmade01").classList.toggle('margshow');

    document.querySelector("#writtencontactinfo01").classList.toggle('writteninfoclose');
    document.querySelector("#writtencontactinfo01").classList.toggle('writteninfoopen');

    document.querySelector('#canvas1').classList.toggle('margclose01');
    document.querySelector('#canvas1').classList.toggle('margshow01');

    document.querySelectorAll('.boxtemplate').forEach(listelem =>{
        listelem.classList.toggle('margclose01')
    });
    document.querySelectorAll('.boxtemplate').forEach(listelem =>{
        listelem.classList.toggle('margshow01')
    });

    //boxtemplate

    if (document.querySelector('#canvas1').classList.contains('margclose01')){
        adjustmentx = 0;
    }
    else{
        adjustmentx = 180;
    }

    
    // if (layoutboolean) {
    //     document.getElementById("overallstructure").style.gridTemplateColumns = "0px 1fr";
    //     layoutboolean = false;
    // }
    // else{
    //     document.getElementById("overallstructure").style.gridTemplateColumns = "280px 1fr";
    //     layoutboolean = true;
    // }

})


//Maze Solving Begins
const rows = 15;
const columns = 20;

class mouseproperties{
    constructor(){
        this.mousedown = false;
    }
}

var mouse = new mouseproperties();



window.addEventListener("mousedown", ()=>{
    mouse.mousedown = true;

})
window.addEventListener("mouseup", ()=>{
    mouse.mousedown = false;

})

//useful functions
function matrixValue(idnumber, column, row){

    var y_value = Math.floor(idnumber/column);
    var x_value = idnumber%column;

    return [x_value,y_value]
}
function mapValue(x,y){
    return y*(columns)+x;
}

var map_matrix = new Array(rows*columns);

for (let i=0; i<map_matrix.length;i++){
    map_matrix[i] = new Array(columns*rows).fill(Infinity)
}

for (let i = 0; i<map_matrix.length;i++){
    map_matrix[i][i] = 0;
}

//funcitons end



for (let i=0; i<300;i++){

    var classname = "l"+String(i);
    $('.main_maze').append(
        $('<div/>')
        .attr("id", String("divname"))
        .addClass("divhere " + classname )
        .append("<span/>")
        .attr('draggable', false)

        );


}

//create a maze matrix using the divs that were used 
//conver that to a mapmatrix then run that throuhg the algorithm when a button is pressed

let maze = new Array(rows);
for (let i=0; i<columns;i++){
    maze[i] = new Array(columns).fill(0);
}


document.querySelectorAll(".divhere").forEach(elem =>{

    elem.addEventListener("click", ()=>{
        elem.classList.toggle("active");
        elem.classList.remove("pathhere");

        //lets toggle mapmatrix value
        //first retrieve the matrixmap id
        var listcord = matrixValue(parseInt(elem.classList[1].slice(1)),columns,0); //returns the order as [column, row]

        if (maze[listcord[1]][listcord[0]] == 0){
            maze[listcord[1]][listcord[0]] = 1;
        }
        else{
            maze[listcord[1]][listcord[0]] = 0;
        }

    })

    elem.addEventListener("mouseenter",function(){
        if (mouse.mousedown == true){
            elem.classList.toggle("active");
            elem.classList.remove("pathhere");

            var listcord = matrixValue(parseInt(elem.classList[1].slice(1)),columns,0); //returns the order as [column, row]

            if (maze[listcord[1]][listcord[0]] == 0){
                maze[listcord[1]][listcord[0]] = 1;
            }
            else{
                maze[listcord[1]][listcord[0]] = 0;
            }
    
        }
        });
})


document.querySelector(".solvemaze").addEventListener("click",()=>{


     map_matrix = new Array(rows*columns);

for (let i=0; i<map_matrix.length;i++){
    map_matrix[i] = new Array(columns*rows).fill(Infinity)
}

for (let i = 0; i<map_matrix.length;i++){
    map_matrix[i][i] = 0;
}

    document.querySelectorAll('.pathhere').forEach(indelem =>{
        indelem.classList.remove('pathhere');
    })


    


    for (var y=0; y<rows; y++){

        for (var x=0; x<columns; x++){
            var map_value = mapValue(x,y);

            if (maze[y][x] != 1){
                if (x-1>-1 && maze[y][x-1] != 1){
                    map_matrix[map_value][mapValue(x-1,y)] = 1;
                }
                if (x+1<columns && maze[y][x+1] != 1){
                    
                    map_matrix[map_value][mapValue(x+1,y)] = 1;
                }
                if (y-1>-1 && maze[y-1][x] != 1){
                    map_matrix[map_value][mapValue(x,y-1)] = 1;
                }
                if (y+1<rows && maze[y+1][x] != 1){
                    map_matrix[map_value][mapValue(x,y+1)] = 1;
                }
            }

        }
    }




    const inf = Infinity;
    let mapmatrix = [...map_matrix];
    console.log("-------------------SEPERATOR-----------------------")

    // hellosthere
    const START = 0;
    const END =rows*columns-1;
    let unvisited = [];

    for (let i=0;i<mapmatrix.length;i++){
        unvisited.push(i);
    }


    //creating a "path", this gets updated each time a new shorter path is found

    let path =[];
    //start by assuming that the shortest path is the direct path
    for (let i=0; i<mapmatrix.length;i++){
        path.push([START,i]);
    }



    while (unvisited.length){
        //find smallest value for the distance
        var snode = undefined;
        var svalue = Infinity;
        unvisited.forEach(node =>{
            if(mapmatrix[START][node] <= svalue){
                snode = node;
                svalue = mapmatrix[START][node];
            }
        })
        // this will return the smallest value (svalue) and node (snode)

        // find all paths snode is connected to:
        // iterate through the matrixmap so matrixmap[snode][-->nextnode]<distvalue.get(-->nextnode) if so then update

        //can implement some string carry to recall the path as well but for now it stores the path lengths only
        for (let i=0; i<mapmatrix.length;i++){
            if (mapmatrix[START][snode] + mapmatrix[snode][i] < mapmatrix[START][i]){
                mapmatrix[START][i] = mapmatrix[START][snode] + mapmatrix[snode][i];
                //updating the shortest path taken
                path[i].splice(path[i].length-1,1);
                for (let n=1; n<path[snode].length;n++){
                    path[i].push(path[snode][n])
                }
                path[i].push(i);
            }
        }
        unvisited.splice(unvisited.indexOf(snode),1);
    }



    path.forEach(listhere =>{
        var printstring = "";
        for (let i=0;i<listhere.length;i++){
            printstring += listhere[i];
            if(i<listhere.length-1){
                printstring += " --> "
            }
        }
    })


    for (let i=1; i<path[END].length;i++){
        var classname = ".l"+String(path[END][i]);
        document.querySelector(classname).classList.add("pathhere");

    }

    
})
//conver the divs into a map matrix