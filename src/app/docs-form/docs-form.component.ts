import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doc } from '../doc';
import { DocService } from '../doc-service';
import { DocSharedProvider } from '../shared/doc-shared-provider';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-docs-form',
  templateUrl: './docs-form.component.html',
  styleUrls: ['./docs-form.component.scss']
})
export class DocsFormComponent implements OnInit, OnDestroy {
  @Output() addDoc = new EventEmitter<Doc>();
  @Input() editDoc: Doc;
  doc: Doc;
  unSubscribe$: Subject<any> = new Subject<any>();
  pdfSrc: string = '';
  pdfName: string = '';

  constructor(
    private fb: FormBuilder,
    private docService: DocService,
    private DocShared: DocSharedProvider,
    private snackBar: MatSnackBar
    ) { }

  formDoc: FormGroup;
  todayFormatDate(): string {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

  handlePdfChange(e) {
    console.log('chamou')
      var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
      var pattern = /application-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        this.snackBar.open("Formato Inválido! Somente arquivos PDF são aceitos", "OK", {duration: 3500})
          return;
      }

      var type = file.type.split("application/");

      this.formDoc.get('fileName').setValue(file.name);
      reader.onload = this._handleReaderPdfLoaded.bind(this);
      reader.readAsDataURL(file);
  }
  _handleReaderPdfLoaded(e) {
      let reader = e.target;
      this.formDoc.get('file').setValue(reader.result);
     // this.selectedNotif.arquivo = this.pdfSrc;
  }

  onSave(){
    this.doc = this.formDoc.value;
    this.formDoc.reset();
    this.formDoc.get('date').setValue(this.todayFormatDate());
    this.addDoc.emit(this.doc);
  }

  ngOnInit(): void {
    this.formDoc = this.fb.group({
      id: [''],
      owner: ['', [Validators.required]],
      file: ['', [Validators.required]],
      fileName: ['', [Validators.required]],
      date: [this.todayFormatDate(), [Validators.required]],
    });
    this.DocShared.getSelectedPerson()
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((doc) => {
        if (doc) {
          this.formDoc.setValue(doc);
        }
      });
  }
  ngOnDestroy(): void {
    this.unSubscribe$.next();
  }

}
