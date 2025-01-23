
import {Modal} from "../../classess/modal";
import {toursDataArray} from "../../index";
import {ITours} from "../../models/tours";


// Определить типы для метода (возвращающие и для переменных в теле функции)

export function openModal(type: string, i: number): void {

    const data: ITours = toursDataArray[i];
    const tourId: undefined | string = data?.id; // была ошибка const tourId = data[i]?.id;
    
    switch (type) {
        case "order":
            const modalTemplate: string = `
      <div> 
      <p data-moda-id="tour-modal" class="close-modal">x</p>
      <p>${data.name}</p>
      <p>${data.description}</p>
       
       <div data-tour-id=${tourId} class="ticket-submit">
       <a href="/ticket.html">Купить билет</a>
       </div>
       </div>
  `
            const modal: Modal = new Modal('tour-modal');
            modal.open(modalTemplate);
            break;
    }
}


