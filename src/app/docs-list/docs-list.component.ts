import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { DocService } from '../doc-service';
import { Doc } from '../doc';
import { DocSharedProvider } from '../shared/doc-shared-provider';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-docs-list',
  templateUrl: './docs-list.component.html',
  styleUrls: ['./docs-list.component.scss']
})
export class DocsListComponent implements OnInit {


  cards: any[] = [{card: 'card1', numero: 1, progress: "97%"},{},{}]
  @Input() docs: Doc[] = [];

  constructor(
    private docService: DocService,
    private sharedDoc: DocSharedProvider,
    private snackBar: MatSnackBar
    ) {

  }

  ngOnInit() {
    console.log(this.docs);

  }
  onEdit(doc: Doc) {
    this.sharedDoc.docEmitter(doc);
  }
  onDelete(doc: Doc) {
    for (let i = 0; i < this.docs.length; i++) {
      let p = this.docs[i];
      if (p.id === doc.id) {
        this.snackBar.open("Deseja realmente excluir esse cadastro?", "Excluir", { duration: 5000 }).onAction()
        .subscribe(() => {
          this.docs.splice(i, 1);
          console.log(this.docs);
        });

      }
    }
  }
  teste(arquivo){
    console.log(arquivo);
  }
  download(arquivo: Doc) {
    if (arquivo) {
      const linkSource =  arquivo.file;
      const downloadLink = document.createElement("a");
      const fileName = arquivo.fileName;

      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }


  }

}
