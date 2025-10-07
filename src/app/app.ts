import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Movie } from './services/movie';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit  {

  protected readonly title = signal('frontend-curser');
  protected listOfItems =  [
          { title: 'Teste Explore teste the Docs', link: 'https://angular.dev' },
          { title: 'Learn with Tutorials', link: 'https://angular.dev/tutorials' },
          { title: 'Prompt and best practices for AI', link: 'https://angular.dev/ai/develop-with-ai'},
          { title: 'CLI Docs', link: 'https://angular.dev/tools/cli' },
          { title: 'Angular Language Service', link: 'https://angular.dev/tools/language-service' },
          { title: 'Angular DevTools', link: 'https://angular.dev/tools/devtools' },
        ]

   users: any[] = [];

  constructor(private userService: Movie) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  printUsers (){
    console.log(this.users)
  }
}
