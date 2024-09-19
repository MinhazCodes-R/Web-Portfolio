
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
