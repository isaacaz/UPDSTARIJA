import { Component, OnInit } from '@angular/core';
import { DocumentViewer  } from '@ionic-native/document-viewer/ngx';
import { File } from '@ionic-native/File/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';


@Component({
  selector: 'app-documento',
  templateUrl: './documento.page.html',
  styleUrls: ['./documento.page.scss'],
})

export class DocumentoPage implements OnInit {

  fileTransfer: FileTransferObject;


  constructor(private platform:Platform,private previewAnyFile: PreviewAnyFile, private document:DocumentViewer, private file:File, private transfer: FileTransfer,private fileOpener:FileOpener) { 

    
  }
  
  ngOnInit() {
  }
  
  // Open()
  // {
  //   // const fileTransfer: FileTransferObject = this.transfer.create()
  //   // let downloadURL='http://jornadasciberseguridad.riasc.unileon.es/archivos/ejemplo_esp.pdf';
  //   // let path=this.file.dataDirectory;
    
  //   // fileTransfer.download(downloadURL,path+'file.pdf').then(entry=>{
      
  //   //   let url=entry.toURL();
  //   //   if(this.platform.is('ios')){
  //   //     this.document.viewDocument(url,'application/pdf',{});
  //   //   }else{
  //   //     console.log(url);
  //   //     this.fileOpener.open(url,'application/pdf').then(() => console.log('File is opened'))
  //   //     .catch(e => console.log('Error opening file', e));
  //   //   }
  //   // });
  //   let url='https://drive.google.com/file/d/1cjhwi34kNwKZB7ZzX4gljCRtw2VdyUAh/view';
  //   this.previewAnyFile.preview(url).then(()=>{

  //   },(err)=>{
  //     console.log(err);
  //   })
  // }

  // download() {
  //   const fileTransfer: FileTransferObject = this.transfer.create();
  //   const url = 'https://drive.google.com/file/d/1cjhwi34kNwKZB7ZzX4gljCRtw2VdyUAh/view';
  //   fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {

  //     if(this.platform.is('ios')){
  //       this.document.viewDocument(entry.toURL(),'application/pdf',{});
  //     }else{
  //       this.fileOpener.open(entry.toURL(),'application/pdf').then(() => console.log('File is opened'))
  //       .catch(e => console.log('Error opening file', e));
  //     }
  //     console.log('download complete: ' + entry.toURL());
  //   }, (error) => {
  //     // handle error
  //   });
  // }


  download(url: string, title: string) {
    this.fileTransfer = this.transfer.create();
    this.fileTransfer
    .download(url, this.file.dataDirectory + title + ".pdf")
    .then(entry => {
    console.log("download complete: " + entry.toURL());
    this.fileOpener
    .open(entry.toURL(), "application/pdf")
    .then(() => console.log("File is opened"))
    .catch(e => console.log("Error opening file", e));
    });
    
  }
  
  Open(title:string){
    let url:string;
    switch (title) {
      case 'GTE':
        url='https://tarija.upds.edu.bo/ViewPdf/Guia_Team_Estudiante.pdf'
        break;
      case 'GTM':
        url='https://tarija.upds.edu.bo/ViewPdf/Guia_Teams_Movil.pdf'
        break;
      case 'GIE':
          url='https://tarija.upds.edu.bo/ViewPdf/Guia_Invitado_Estudiante.pdf'
          break;
      case 'GME':
          url='https://tarija.upds.edu.bo/ViewPdf/Guia_Moddle_Estudiante.pdf'
          break;

    }

    this.fileTransfer = this.transfer.create();
    this.fileTransfer
    .download(url, this.file.dataDirectory + title + ".pdf")
    .then(entry => {
    console.log("download complete: " + entry.toURL());
    this.fileOpener
    .open(entry.toURL(), "application/pdf")
    .then(() => console.log("File is opened"))
    .catch(e => console.log("Error opening file", e));
    });

  }
   
}
