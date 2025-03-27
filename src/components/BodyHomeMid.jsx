import peopleWork1 from '../assets/people-work.jpg'
import random from '../assets/random.jpg'

function BodyHomeMid() {
    return (
        <div id='sobreNos' className="w-full px-40 py-32 space-y-72 bg-white text-zinc-900">
            <div id='nossaMissao' className='flex justify-center items-center gap-14'>
                <div className='max-w-[600px] space-y-6'>
                    <h1 className='font-bold text-center'>Nossa Missão</h1>
                    <p className='text-zinc-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, cupiditate atque, voluptate dolores, amet iure tempore culpa similique porro omnis quis et magnam quasi reiciendis? Aut earum ab fugit numquam! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas neque iste, debitis reiciendis ex sequi alias, mollitia, dolorem suscipit magni odit minima facilis. Eveniet consectetur nam nostrum iusto necessitatibus voluptate!</p>
                </div>

                <img className='max-w-full h-auto w-[580px]' src={peopleWork1} alt="" />
            </div>

            <div className='flex flex-col justify-center items-center gap-14'>
                <h1 className='font-bold'>Nossa História</h1>

                <div className='flex justify-center items-center gap-14'>
                    <iframe width="580" height="315" src="https://www.youtube.com/embed/pKxWPo73pX0?si=iLhzn-TBdUrPQ6RX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    
                    <p className='text-zinc-500 w-[580px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, cupiditate atque, voluptate dolores, amet iure tempore culpa similique porro omnis quis et magnam quasi reiciendis? Aut earum ab fugit numquam! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas neque iste, debitis reiciendis ex sequi alias, mollitia, dolorem suscipit magni odit minima facilis. Eveniet consectetur nam nostrum iusto necessitatibus voluptate! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate distinctio porro nemo ex voluptate blanditiis repellat quos soluta id vero! Nisi provident rerum ut odit, ullam velit reiciendis fugit pariatur. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim officiis iusto beatae veritatis animi eos similique, tenetur commodi! Iste cumque molestias hic debitis architecto, provident quod! Odit iusto deleniti dolorem. lorem</p>
                </div>
            </div>

            <div className='flex justify-center items-center gap-14'>
                <div className='max-w-[600px] space-y-6'>
                    <h1 className='font-bold text-center'>Millenium Avante!</h1>
                    <p className='text-zinc-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, cupiditate atque, voluptate dolores, amet iure tempore culpa similique porro omnis quis et magnam quasi reiciendis? Aut earum ab fugit numquam! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas neque iste, debitis reiciendis ex sequi alias, mollitia, dolorem suscipit magni odit minima facilis. Eveniet consectetur nam nostrum iusto necessitatibus voluptate!</p>
                </div>

                <img className='max-w-full h-auto w-[580px]' src={random} alt="" />
            </div>
        </div>
    )
}

export default BodyHomeMid