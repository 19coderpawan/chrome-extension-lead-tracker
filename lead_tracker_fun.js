let arr = []
let unlist = document.getElementById("unorderedlist")
let inputfield = document.getElementById("input_el")
let saveel = document.getElementById("save_el")
const deletebtn=document.getElementById("delete_el")
const tabbtn=document.getElementById("tab_el")

// now to fetch the data form localstorage we use .getItem("key") basically to display the data on screen.
// also here we have use JASON.parse() which again going to convert the string into array .
let arrformlocalStorage = JSON.parse(localStorage.getItem("myleads"))

// now we have to check whether the localstorage has any data or leads or not.
// if yes then simply display on the screen.
// here our javascript will check whether arrfromlocalStorage is truthy or falsely if truthy it will render out list.
// if falsey it will ignore the if clause. 
if(arrformlocalStorage){
   arr=arrformlocalStorage
   // now to make our function more dyanmic we are going to pass array as an argument.
   render(arr) 
}

saveel.addEventListener("click", function () {
   // to get the input value from the input field section we use .value
   arr.push(inputfield.value)

   // to store the array in the local storage .setItem is used and inside ("key",value you are going to store.)
   // JASON.strigify is used here to convert the array into string because we can only store strings type in localstorage.
   localStorage.setItem("myleads", JSON.stringify(arr))
   //  inputed array is being passed.
   render(arr)
})
 
//function to render out the data stored in the array in list form.
function render(passedarr) { // here the passedarr store the argument passed to it .
   //  to make our code performance better instead of calling .innerHTML multiple times its good to call it once.and to do that.
   let list = ""
   for (let i = 0; i < passedarr.length; i++) {
      list += `<li>
       <a href='${passedarr[i]}' target='_blank'>
       ${passedarr[i]}
       </a> 
       </li>`
   }

   // with the help of .innerHTML we can create html tags into the java script.
   unlist.innerHTML = list

   //  with this we our inputfield will be cleared once you clicked the  save button no need to backspace the text again and again.
   inputfield.value = ""
}

// function for delete butoon .and eventlistener.
deletebtn.addEventListener("dblclick",function(){
   localStorage.clear()
   arr=[]
   // here the empty array is passed.
   render(arr)
})

// function for tab button.
// to get the current tab we are going to use the API for that .
tabbtn.addEventListener("click",function(){
   chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        arr.push(tabs[0].url)
        localStorage.setItem("myleads",JSON.stringify(arr))
        render(arr)
   })
   // after this just go to the manifest.json and add permissions in it.
})
