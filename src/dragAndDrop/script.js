let drag_item=document.querySelector('.drag-item');
let boxesElement=document.querySelectorAll('.boxes');

const dragStartHandler=(e)=>
{
    setTimeout(() => {
          e.target.style.opacity="0"
     }, 0);
    
}

const dragendHandler=(e)=>
{
    e.target.style.opacity="1"

    e.target.classList.remove('hovered-boxes')
  
    
}
const dragoverHandler=(e)=>
{
    e.target.classList.add('hovered-boxes')
    e.preventDefault();
    
}
const dragenterHandler=(e)=>
{ 
    e.target.classList.add('hovered-boxes')
    e.preventDefault();

    
   
}
const dragleaveHandler=(e)=>
{
 e.target.classList.remove('hovered-boxes')

}
const dropHandler=(e)=>
{
    e.target.classList.remove('hovered-boxes');
     
    if(e.target!=drag_item)
        {
            
            e.target.append(drag_item)
        }
}


drag_item.addEventListener('dragstart',dragStartHandler)
drag_item.addEventListener('dragend',dragendHandler)
boxesElement.forEach((ele)=>{
    ele.addEventListener('dragover',dragoverHandler)
    ele.addEventListener('dragenter',dragenterHandler)
    ele.addEventListener('dragleave',dragleaveHandler)
    ele.addEventListener('drop',dropHandler)

})