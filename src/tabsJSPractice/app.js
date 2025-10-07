let btnElements=document.querySelectorAll('.tab-btn');
let contentsElement=document.querySelectorAll('.content');
let wrpperElement=document.querySelector('.wrpper');


const tabHandler=(e)=>
{

    const currentBtnId=e.target.dataset.id;

    if(currentBtnId)
    {
        // remove active class on btns
        btnElements.forEach((btn)=>
            {
            btn.classList.remove('active-btn');
            btn.classList.add('bg-cyan-100');
            e.target.classList.add('active-btn')
            e.target.classList.remove('bg-cyan-100')
            }

        );
        //remove active class on contnetn
        contentsElement.forEach((content)=>
            {
            content.classList.remove('active');
            document.getElementById(currentBtnId).classList.add('active')
            }
        )
        

        
    }

}






wrpperElement.addEventListener('click',tabHandler)
