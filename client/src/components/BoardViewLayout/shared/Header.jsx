function Header(){


    return <div className="flex justify-center items-center 
                pt-7
                pl-7
                pr-7">
        
        <div className=" flex grow  items-center gap-5">
            <div className="flex justify-center items-center hover:bg-[#252424] p-1 rounded-sm">BoardName</div>
            <div className="flex justify-center items-center hover:bg-[#252424] p-1 rounded-sm gap-1" >
                {/* <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M3 3.6V20.4C3 20.7314 3.26863 21 3.6 21H20.4C20.7314 21 21 20.7314 21 20.4V3.6C21 3.26863 20.7314 3 20.4 3H3.6C3.26863 3 3 3.26863 3 3.6Z" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 6L6 16" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 6V9" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 6V13" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 6V11" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path></svg> */}
                {/* <svg width="24px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ebebeb"><path d="M3 3.6V20.4C3 20.7314 3.26863 21 3.6 21H20.4C20.7314 21 21 20.7314 21 20.4V3.6C21 3.26863 20.7314 3 20.4 3H3.6C3.26863 3 3 3.26863 3 3.6Z" stroke="#ebebeb" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 6L6 16" stroke="#ebebeb" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 6V9" stroke="#ebebeb" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 6V13" stroke="#ebebeb" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 6V11" stroke="#ebebeb" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg> */}
                <div>
                    <svg width="20px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ebebeb"><path d="M3 3.6V20.4C3 20.7314 3.26863 21 3.6 21H20.4C20.7314 21 21 20.7314 21 20.4V3.6C21 3.26863 20.7314 3 20.4 3H3.6C3.26863 3 3 3.26863 3 3.6Z" stroke="#ebebeb" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 6L6 16" stroke="#ebebeb" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 6V9" stroke="#ebebeb" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 6V13" stroke="#ebebeb" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 6V11" stroke="#ebebeb" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </div>
                <div>
                    <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#e3e3e3"><path d="M6 9L12 15L18 9" stroke="#e3e3e3" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </div>
            </div>
        </div>
        
        
        <div className="flex items-center gap-2">

            <div className="flex justify-center items-center hover:bg-[#252424] p-1 rounded-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="#feeeff" className="size-4.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </div>

            <div className="flex justify-center items-center hover:bg-[#252424] p-1 rounded-sm">
                <svg width="20px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M3.99961 3H19.9997C20.552 3 20.9997 3.44764 20.9997 3.99987L20.9999 5.58569C21 5.85097 20.8946 6.10538 20.707 6.29295L14.2925 12.7071C14.105 12.8946 13.9996 13.149 13.9996 13.4142L13.9996 19.7192C13.9996 20.3698 13.3882 20.8472 12.7571 20.6894L10.7571 20.1894C10.3119 20.0781 9.99961 19.6781 9.99961 19.2192L9.99961 13.4142C9.99961 13.149 9.89425 12.8946 9.70672 12.7071L3.2925 6.29289C3.10496 6.10536 2.99961 5.851 2.99961 5.58579V4C2.99961 3.44772 3.44732 3 3.99961 3Z" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
            
            <div className="flex justify-center items-center hover:bg-[#252424] p-1 rounded-sm">
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fafafa"><path d="M10 14H2" stroke="#fafafa" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 10H2" stroke="#fafafa" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 6H2" stroke="#fafafa" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 18H2" stroke="#fafafa" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19 20V4M19 20L22 17M19 20L16 17M19 4L22 7M19 4L16 7" stroke="#fafafa" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
            {/* <div className="flex justify-center items-center">
               <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M3 6H21" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 12L17 12" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 18L13 18" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div> */}
           
           
            <div className="flex justify-center items-center hover:bg-[#252424] p-1 rounded-sm">
                <svg width="20px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
            
            <div className="flex justify-center items-center hover:bg-[#252424] p-1 rounded-sm">
                <svg width="20px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M20 13V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V13" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 15V3M12 3L8.5 6.5M12 3L15.5 6.5" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
            
       

           
            <div className="flex justify-center items-center hover:bg-[#252424] p-1 rounded-sm">
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M1 20V19C1 15.134 4.13401 12 8 12V12C11.866 12 15 15.134 15 19V20" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round"></path><path d="M13 14V14C13 11.2386 15.2386 9 18 9V9C20.7614 9 23 11.2386 23 14V14.5" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round"></path><path d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 9C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6C15 7.65685 16.3431 9 18 9Z" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>

            <div className="flex justify-center items-center gap-0.5 bg-blue-950  pr-2 text-sm hover:bg-[#252424] p-1 rounded-sm">
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M6 12H12M18 12H12M12 12V6M12 12V18" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                <div>New List</div>
            </div>

            <div className="flex justify-center items-center hover:bg-[#252424] p-1 rounded-sm">
                <svg width="18px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M20 12.5C20.2761 12.5 20.5 12.2761 20.5 12C20.5 11.7239 20.2761 11.5 20 11.5C19.7239 11.5 19.5 11.7239 19.5 12C19.5 12.2761 19.7239 12.5 20 12.5Z" fill="#ffffff" stroke="#ffffff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 12.5C12.2761 12.5 12.5 12.2761 12.5 12C12.5 11.7239 12.2761 11.5 12 11.5C11.7239 11.5 11.5 11.7239 11.5 12C11.5 12.2761 11.7239 12.5 12 12.5Z" fill="#ffffff" stroke="#ffffff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 12.5C4.27614 12.5 4.5 12.2761 4.5 12C4.5 11.7239 4.27614 11.5 4 11.5C3.72386 11.5 3.5 11.7239 3.5 12C3.5 12.2761 3.72386 12.5 4 12.5Z" fill="#ffffff" stroke="#ffffff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>

        </div>
    </div>
}

export default Header;



