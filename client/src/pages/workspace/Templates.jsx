export default function Templates(){

    return <div className="  pt-10 ">
            <div className="flex justify-between ">
                <div><h1 className="text-lg font-medium items-center mb-10 text-[#f1eeee]">Templates</h1></div>
                <div className="text-base bg-white h-fit rounded-sm px-2"> + New</div>
            </div>
            
            <div className="flex gap-20 mb-8">
                <div className="text-sm">Yours</div>
                {/* <div className="text-sm">Starred</div> */}
                <div className="text-sm">Featured</div>
            </div>
            
            <div className="grid grid-cols-3 gap-10 b-8">

                <div className="w-full min-h-30 max-h-fit text-white bg-[#42515d] rounded-xl flex flex-col items-center p-3">
                    <div className="w-full h-10 text-base bg-[#281f1f] text-center">title</div>
                    <div className="w-full grow text-base bg-[#ada0a0] text-center">desc</div>
                </div>

                <div className="w-full h-30 bg-[#42515d] rounded-xl flex flex-col items-center p-3">
                    <div className="w-full h-10 text-base bg-[#281f1f]  text-center">title</div>
                    <div className="w-full grow text-base bg-[#ada0a0] text-center">desc</div>
                </div>

                <div className="w-full h-30 bg-[#42515d] rounded-xl flex flex-col items-center p-3">
                    <div className="w-full h-10 text-base bg-[#281f1f]  text-center">title</div>
                    <div className="w-full grow text-base bg-[#ada0a0] text-center">desc</div>
                </div>

                <div className="w-full h-30 bg-[#42515d] rounded-xl flex flex-col items-center p-3">
                    <div className="w-full h-10 text-base bg-[#281f1f]  text-center">title</div>
                    <div className="w-full grow text-base bg-[#ada0a0] text-center">desc</div>
                </div>

                <div className="w-full h-30 bg-[#42515d] rounded-xl flex flex-col items-center p-3">
                    <div className="w-full h-10 text-base bg-[#281f1f]  text-center">title</div>
                    <div className="w-full grow text-base bg-[#ada0a0] text-center">desc</div>
                </div>

                <div className="w-full h-30 bg-[#42515d] rounded-xl flex flex-col items-center p-3">
                    <div className="w-full h-10 text-base bg-[#281f1f]  text-center">title</div>
                    <div className="w-full grow text-base bg-[#ada0a0] text-center">desc</div>
                </div>

          

            </div>
    </div>
}