import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Doc } from '../doc';
import { DocService } from '../doc-service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {
  docs: Doc[] = [];
  autenticated$: Observable<boolean>;
  constructor(private docService: DocService, private snackBar: MatSnackBar, private authService: AuthService, private router: Router) {
    this.docs = docService.getDocs();
    this.autenticated$ = authService.isAuthenticated();
  }

  ngOnInit(): void {
    this.isAutenticated();
  }
  onAddDoc(doc: Doc) {
    // this.people.push(person);
    let exist = false;
    for (let i = 0; i < this.docs.length; i++) {
      let p = this.docs[i];
      if (p.id === doc.id) {
        this.snackBar.open("Deseja alterar esse arquivo?", "Alterar", {duration: 5000}).onAction()
          .subscribe(() => {
            this.docs.splice(i, 1, doc);
            console.log(this.docs);

          });
          exist = true;
        }
    }
    if(!exist) {
      doc.id = Guid.create().toString();
      this.docs.push(doc);
      console.log(doc);
      this.snackBar.open(`Arquivo de ${doc.owner} incluído com sucesso!`, "Ok", {duration: 3500});
    }
  }
  isAutenticated(){
    this.autenticated$.subscribe(y => {
      console.log(y);
      if(y) {
        this.router.navigateByUrl('/');
      } else {
        this.router.navigateByUrl('/login')
      }
    });
  }
}
