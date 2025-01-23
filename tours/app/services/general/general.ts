
/* Общие методы используются для вставки текста в header   footer*/

/*  -
    - Указать в методах возвращающие типы, типы для параметров, в теле функции также указать типы
*/
import {getTourTemplate} from "../../templates/tours";
import {openModal} from "@services/modal/modalService";
import {ITours} from "../../models/tours";

export function initHeaderTitle(ticketName: string, selector: string): void {
    const headerElement: null | HTMLElement= document.querySelector('header');
    const targetItem: null | HTMLElement = headerElement.querySelector(selector);
    if (targetItem) {
        targetItem.innerText = ticketName;
    }
}

export function initFooterTitle(ticketName: string, selector: string): void {
    const headerElement = document.querySelector('footer');
    const targetItem: HTMLElement = headerElement.querySelector(selector);
    if (targetItem) {
        targetItem.innerText = ticketName;
    }
}


export function initToursDivElements(data: ITours[]): void {

    if (Array.isArray(data)) {
        const rootElement: Element = document.querySelector('.main-app');
        const tourWrap: HTMLElement = document.createElement('div');

        tourWrap.classList.add('tour-wrap');

        // init click for modal
        initTourElemListener(tourWrap);

        let rootElementData: string = '';
        data.forEach((el: ITours, i: number): void => {
            rootElementData += getTourTemplate(el, i);
        });

        tourWrap.innerHTML = rootElementData;
        rootElement.appendChild(tourWrap) ;
    }
}


export function initTourElemListener(tourWrap: HTMLElement): void {
    tourWrap.addEventListener('click', (ev: MouseEvent) => {
        const targetItem: HTMLElement = ev.target as HTMLElement;
        const parentItem: HTMLElement = targetItem?.parentNode as HTMLElement;
        let realTarget: undefined | HTMLElement;

        if (targetItem.hasAttribute('data-tour-item-index')) {
            realTarget = targetItem;
        } else if (parentItem && parentItem.hasAttribute('data-tour-item-index')) {
            realTarget = parentItem;
        }

        if (realTarget) {
            const dataIndex: undefined | string = realTarget.getAttribute('data-tour-item-index');
            openModal('order', Number(dataIndex));
        }
    });
}

