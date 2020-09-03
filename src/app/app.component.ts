import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { v4 as uuidv4 } from 'uuid';
import { Items } from 'src/app/constants/items';
import { ItemsServices } from 'src/app/service/item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'Dway | Item';

  items: Items[];
  item: Items[];
  getDismissReason: void;

  dataDropdown = [
    {typeItem: 'Dapur'}, 
    {typeItem: 'Elektronik'}, 
    {typeItem: 'Buku'}, 
    {typeItem: 'Komputer'}, 
    {typeItem: 'Fashion'}]

  namaItem: string = "";
  kategori: string = "";
  tanggalKadaluarsa: string = "";

  constructor(private itemsService: ItemsServices, private modalService: NgbModal) { 
    //  this.items = new Items();
  }

  ngOnInit(): void {
    this.getItems()
  }

  open(content) {
    console.log('content',content )
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  saveItem(){   
    console.log()
    console.log({ name: this.namaItem, typeItem: this.kategori, expiredDate: this.tanggalKadaluarsa}  )

    this.itemsService.saveItem(
      { name: this.namaItem, typeItem: this.kategori, expiredDate: new Date (this.tanggalKadaluarsa).getTime() / 1000, uuid: uuidv4()})
      .subscribe(() => {
        this.itemsService.getItems().subscribe((item) => {
          this.items = item;
          console.log('saveItem', this.namaItem, this.kategori, new Date (this.tanggalKadaluarsa).getTime() / 1000)
          alert("Data Berhasil Di Tambah")
          this.modalService.dismissAll()
        })
      })
  }

  getItems(): void {
    this.itemsService.getItems()
    .subscribe((items) => {
      console.log('items', items)
      this.items = items;
    })
  }

  deleteItem(id) {
    this.itemsService.deleteItem(id)
      .subscribe(() => {
        this.itemsService.getItems().subscribe((item) => {
          this.items = item;
          console.log('item', id)
          alert("Data Berhasil Di Delete")
        })
      })
  }
}

// uuidv4();