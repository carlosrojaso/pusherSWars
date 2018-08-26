import { Component, OnInit } from '@angular/core';

import { Character } from '../character';
import { SwapiService } from '../api/swapi.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  protected character: Character;

  constructor(
    protected swapiService: SwapiService
  ) {
    this.initialize();
  }

  initialize() {
    this.swapiService.getCharacter().subscribe(
      (people) => {
        this.character = { name: people.name, height: people.height, mass: people.mass };
        console.log(this.character);

        // Getting Image
        this.swapiService.getCharacterImage(this.character.name).subscribe(
          (image) => {
            this.character.image = image.data[0].images.downsized_medium.url;
            console.log(this.character.image);
          }
        );
      }
    );
  }

}
