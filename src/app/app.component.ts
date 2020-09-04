import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { v4 as uuidv4 } from 'uuid';
import { Items } from 'src/app/constants/items';
import { ItemsServices } from 'src/app/service/item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Dway | Item';

  items: Items[];
  item: Items;
  itemEdit: Items;
  getDismissReason: void;

  dataDropdown = [
    { typeItem: 'Dapur' },
    { typeItem: 'Elektronik' },
    { typeItem: 'Buku' },
    { typeItem: 'Komputer' },
    { typeItem: 'Fashion' },
  ];

  namaItem: string = '';
  kategori: string = '';
  tanggalKadaluarsa: string = '';

  constructor(
    private itemsService: ItemsServices,
    private modalService: NgbModal
  ) {
    //  this.items = new Items();
    // this.itemEdit=new Items();
  }

  ngOnInit(): void {
    this.getItems();
  }

  open(content) {
    console.log('content', content);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  openEdit(content, id) {
    console.log('content', content);
    this.itemsService.getItem(id).subscribe((item) => {
      console.log(item);
      this.item = item;
      console.log(' new Date(this.item.expiredDate).getTime() / 1000');
     

      var date = new Date(item.expiredDate * 1000);
      // Hours part from the timestamp
      var hours = date.getFullYear();
      // Minutes part from the timestamp
      var minutes = '0' + (date.getMonth()+1);
      // Seconds part from the timestamp
      var seconds = '0' + date.getDate();

      // Will display time in 10:30:23 format
      var formattedTime = hours + '-' + minutes.substr(-2) + '-' + seconds.substr(-2);

      console.log(formattedTime);

      this.item.expiredDate = formattedTime ;

      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      // var date = new Date(data.expiredDate);
      // // Hours part from the timestamp
      // var hours = date.getFullYear();
      // // Minutes part from the timestamp
      // var minutes = "0" + date.getMonth();
      // // Seconds part from the timestamp
      // var seconds = "0" + date.getDate();

      // // Will display time in 10:30:23 format
      // var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

      // console.log(formattedTime);

      // var date = new Date(data.expiredDate);
      // var year = date.getFullYear();
      // var month = date.getMonth() + 1;
      // var day = date.getDate();
      // var dateString = year + "-" + month + "-" + day;
      // console.log('formatedDate',dateString)
      // data.expiredDate = dateString;
    });
  }

  saveItem() {
    console.log();
    console.log({
      name: this.namaItem,
      typeItem: this.kategori,
      expiredDate: this.tanggalKadaluarsa,
    });

    this.itemsService
      .saveItem({
        name: this.namaItem,
        typeItem: this.kategori,
        expiredDate: new Date(this.tanggalKadaluarsa).getTime() / 1000,
        uuid: uuidv4(),
      })
      .subscribe(() => {
        this.itemsService.getItems().subscribe((item) => {
          this.items = item;
          console.log(
            'saveItem',
            this.namaItem,
            this.kategori,
            new Date(this.tanggalKadaluarsa).getTime() / 1000
          );
          alert('Data Berhasil Di Tambah');
          this.modalService.dismissAll();
        });
      });
  }

  updateItem(id): void {
    console.log(
      'newItem',
      this.item.name,
      this.item.expiredDate,
      this.item.typeItem
    );

    this.itemsService
      .updateItem(id, {
        name: this.item.name,
        expiredDate: new Date(this.item.expiredDate).getTime() / 1000,
        typeItem: this.item.typeItem,
      })
      .subscribe((itemID) => {
        console.log('newItem', itemID.name, itemID.typeItem);
        // this.itemEdit.expiredDate = (new Date(this.expiredDate.year, this.expiredDate.month-1, this.expiredDate.day )).getTime() / 1000
        this.itemsService.getItems().subscribe((itemEd) => {
          this.items = itemEd;
          alert('Data Berhasil Di Edit');
          this.modalService.dismissAll();
        });
      });
  }

  getItems(): void {
    this.itemsService.getItems().subscribe((items) => {
      console.log('items', items);
      this.items = items;
    });
  }

  deleteItem(id) {
    this.itemsService.deleteItem(id).subscribe(() => {
      this.itemsService.getItems().subscribe((item) => {
        this.items = item;
        console.log('item', id);
        alert('Data Berhasil Di Delete');
      });
    });
  }
}
