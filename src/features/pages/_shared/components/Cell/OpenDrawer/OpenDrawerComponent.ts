import DeleteOutlined from '#node_modules/@ant-design/icons/lib/icons/DeleteOutlined';
import type { ICellRendererParams } from 'ag-grid-enterprise';

export class OpenDrawerComponent {
	eGui!: HTMLDivElement;
	eButton: any;
	eventListener!: () => void;

	init(params: ICellRendererParams) {
		this.eGui = document.createElement('div');
		const eButton = document.createElement('button');
		eButton.className = 'btn-simple';
		// eButton.icon = {< DeleteOutlined />};
		// const company = params.data?.company;
		// 	eButton.textContent = {<i
		// 		className= "fa-solid fa-chevron-right text-slate-300 hover:text-blue-500"
		// 	style = {{ cursor: "pointer" }
		// }
		// />`;
		this.eventListener = () => console.log('Software Launched');
		eButton.addEventListener('click', this.eventListener);
		this.eGui.appendChild(eButton);
	}

	getGui() {
		return this.eGui;
	}

	refresh() {
		return true;
	}

	destroy() {
		if (this.eButton) {
			this.eButton.removeEventListener('click', this.eventListener);
		}
	}
}
