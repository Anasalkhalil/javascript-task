var urlImagesObject = "./data/portofilo.json";
var urlMenuObject = "./data/menu-object.json";

// Title of the Section
const title = document.getElementById('title');
// Inside the div will our menu generated
const list = document.getElementById("menu");
// Portofilo
const imgArea= document.getElementById('images-area');

var htmlImages = "";

// Menu items Object
var menuItem = "";

function recurseMenu(parent) {
                
    let htmlStrTxt = '<ul id ="cl-menu" class="cl-menu" >';
    for (var index in menuItem) {
        if (menuItem[index].parentId == parent) {
            htmlStrTxt += '<li><a onclick="filterSelection(\''+menuItem[index].id+'\')">' + menuItem[index].title;
            if(menuItem[index].childCount > 0){
                htmlStrTxt+= '<i class="fas fa-angle-right"></i>';
                htmlStrTxt += '</a>';
                htmlStrTxt += recurseMenu(menuItem[index].id);
                
            }else{
                htmlStrTxt += '</a>';
            }
            htmlStrTxt += '</li>';
        }
    }
    return htmlStrTxt + '</ul>';
}            
function getMenu(){
        const menuRequest = new XMLHttpRequest();
        menuRequest.open("GET", urlMenuObject , true);
        menuRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Prsing our JSON Obeject
            const response = JSON.parse(menuRequest.responseText);
            menuItem = response.menuObj;
            
            var htmlTxt = "";
            
            htmlTxt = recurseMenu(null);
            list.innerHTML = htmlTxt;
        }else{
        //    throw new Error('Faild XML HttpRequest Menu Objects...');    
        }
    };
    
    menuRequest.send();
}
getMenu();



    

function filterSelection(tag) {
    var imageHttp = new XMLHttpRequest();
    imageHttp.open("GET", urlImagesObject , true);
    title.innerHTML = tag;
    imageHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            // Prsing our JSON Obeject
            let response = JSON.parse(imageHttp.responseText);
            var imageArray = response.images;                
            getAll(imageArray,tag);
            
        }
            
    };
    imageHttp.send();
}

function htmlImage(image){
    htmlImages += '<div class="column show">';
    htmlImages += '<div class="content">';
    htmlImages += '<img src="images/'+ image.name +'" alt="'+ image.tag +'">';
    htmlImages += '<h4>'+ image.name +'</h4>';
    htmlImages += '<p>'+ image.desc +'</p>';
    htmlImages += '</div>';
    htmlImages += '</div>';

    return htmlImage;
}

function getAll(imageArray,tag){
    htmlImages = "";
    for (let index in imageArray) {
            if(tag ==="all" || tag ===""){
                htmlImage(imageArray[index]);
            }else if (imageArray[index].tag.indexOf(tag) > -1) {
                htmlImage(imageArray[index]);
            }     
    }
    if(!htmlImages) htmlImages = 'Comming Soon...'           
    imgArea.innerHTML = htmlImages;

}

filterSelection("all");
