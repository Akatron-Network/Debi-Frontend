import React from 'react'

export default function Sidebar() {
  return (
    <>
    <div id="allsidepanel" className='h-screen translate-x-0 fixed transition duration-500 z-2'>
        <div id="sidepanel" className='w-[250px] -translate-x-[250px] fixed z-2 h-screen top-11 left-0 bg-side_black pt-4'>
			<div id="sidetab_1" className='hidden hrLine'>
				<div id="workspace-title" className="workspace-title">
					<span className="workspace-text">Workspace</span>
				</div>

			</div>

			<div id="sidetab_2" className='hidden hrLine'>
				<div id="workspace-title" className="workspace-title h">
					<span className="workspace-text">Benimle Paylaşılanlar</span>
				</div>
			</div>

			<div id="sidetab_3" className='hidden hrLine'>
				<div id="workspace-title" className="workspace-title mt">
					<span className="workspace-text">Favoriler</span>
				</div>
			</div>

        </div>

        <div id="sidelinks" className='w-[70px] fixed z-1 h-screen top-11 left-0 bg-black_light shadow-sidelinks'>
            <div className="tooltip tooltip-right" data-tip="Çalışma Alanı">
                <button id="open_btn_1" onClick={() => openTab(0)} className='open-tab bg-black_light text-grayXgray shadow-defaultbtn'>
					<i className="fas fa-sitemap"></i>
                </button>

            </div>
            <div className="tooltip tooltip-right" data-tip="Benimle Paylaşılanlar">
                <button id="open_btn_2" onClick={() => openTab(1)} className='open-tab bg-black_light text-grayXgray shadow-defaultbtn'>
					<i className="fas fa-people-arrows"></i>
                </button>
            </div>
            <div className="tooltip tooltip-right display-no" data-tip="Favoriler">
                <button id="open_btn_3" onClick={() => openTab(2)} className='open-tab bg-black_light text-grayXgray shadow-defaultbtn'>
					<i className="fas fa-star"></i>
                </button>
            </div>
        </div>
		
        <div id="openclose" className="w-[30px] fixed z-1 h-screen left-[70px] overflow-x-hidden shadow-openclose top-11">
            <button onClick={openCloseSideBar} className="text-xl bg-black_light text-sea_green !w-[30px] h-[70px] border-none transition duration-300 shadow-openclosebtn top-1/2 -translate-y-1/2 fixed rounded-br-lg rounded-tr-lg hover:text-green_pantone hover:bg-side_black">
                <i id="open_close_btn" className="fas fa-chevron-right" style={{transition: ".5s"}}></i>
            </button>
        </div>

    </div>

	
    
    {/*
				<div class="workspace-title" id="workspace-title">
					<span class="workspace-text">WörkŞpacE</span>
				</div>

				<hr class="hrLine">

				<div id="col1" class="collection path-text col1" onclick="openPath('col1')">
					<i id="c1_angle" class="fa-solid fa-angle-right" style="transition: .3s;"></i>
					<button class="file-path-icons">
						<i class="fas fa-folder-tree"></i>
					</button>
					<span class="path-text">Akatron Network</span>
				</div>

				<div id="col1_fold1" class="folder path-text col1 fold1" onclick="openPath('fold1')">
					<i id="c1_f1_angle" class="fa-solid fa-angle-right" style="transition: .3s;"></i>
					<button class="file-path-icons">
						<i class="fas fa-folder-open"></i>
					</button>
					<span class="path-text">FrontEnd</span>
				</div>

				<div id="col1_fold1_file1" class="file path-text col1 fold1 file1">
					<button class="file-path-icons">
						<i class="fas fa-file-alt"></i>
					</button>
					<span class="path-text">madafaka.js</span>
				</div>

				<div id="col1_fold1_file2" class="file path-text col1 fold1 file2">
					<button class="file-path-icons">
						<i class="fas fa-file-alt"></i>
					</button>
					<span class="path-text">madafaka.js</span>
				</div>

				<div id="col2" class="collection path-text col2" onclick="openPath('col2')">
					<i id="c2_angle" class="fa-solid fa-angle-right" style="transition: .3s;"></i>
					<button class="file-path-icons">
						<i class="fas fa-folder-tree"></i>
					</button>
					<span class="path-text">Akatron Network</span>
				</div>*/}
    </>
  )
}

const openCloseSideBar = () => {

	var allsidepanel = document.getElementById('allsidepanel');
    var open_close_btn = document.getElementById('open_close_btn');


    if(open_close_btn.style.transform === 'rotateZ(180deg)') {

        allsidepanel.style.transform = 'translateX(0px)';
        open_close_btn.style.transform = 'rotateZ(0deg)';

    }

    else {
        allsidepanel.style.transform = 'translateX(250px)';
        open_close_btn.style.transform = 'rotateZ(180deg)';
    }
}

 const openTab = (id) => {

      var tab_id = [1,2,3];
      var open_btn = document.getElementById('open_btn_' + tab_id[id]);
      var open_close_btn = document.getElementById('open_close_btn');

       if(open_close_btn.style.transform === 'rotateZ(180deg)') {
           if(open_btn.classList.contains('bg-side_black')) { //? Açık tab a tekrar tıklandığında sidebar kapanması için koydum
               openCloseSideBar();
           }
           else {
               openTabFor(id);
           }
       }
       else {
           openCloseSideBar();
           openTabFor(id);
       }
 }

const openTabFor = (id) => {
	
    var tab_id = [1,2,3];

    for(var a in tab_id) {

        var open_btn = document.getElementById('open_btn_' + tab_id[a]);
        var tabs = document.getElementById('sidetab_' + tab_id[a]);
        
		open_btn.classList.replace('shadow-openbtn','shadow-defaultbtn');
		open_btn.classList.replace('text-sea_green','text-grayXgray');
		open_btn.classList.replace('bg-side_black','bg-black_light');
		tabs.classList.replace('block','hidden');

    }

    open_btn = document.getElementById('open_btn_' + tab_id[id]);
    tabs = document.getElementById('sidetab_' + tab_id[id]);

	open_btn.classList.replace('shadow-defaultbtn','shadow-openbtn');
	open_btn.classList.replace('text-grayXgray','text-sea_green');
	open_btn.classList.replace('bg-black_light','bg-side_black');
	tabs.classList.replace('hidden','block');

}
