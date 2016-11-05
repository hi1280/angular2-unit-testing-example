// re-export for tester convenience
export { Hero }        from './hero';
export { HeroService } from './hero.service';

import { Hero }        from './hero';
import { HeroService } from './hero.service';

export var HEROES: Hero[] = [
  {id:41, name:'Bob'},
  {id:42, name:'Carol'},
  {id:43, name:'Ted'},
  {id:44, name:'Alice'},
  {id:45, name:'Speedy'},
  {id:46, name:'Stealthy'}
];

export class FakeHeroService extends HeroService {

  heroes = HEROES;
  lastPromise: Promise<any>;  // remember so we can spy on promise calls

  getHero(id: number | string) {
    if (typeof id === 'string') {
      id = parseInt(id as string, 10);
    }
    let hero = this.heroes.find(h => h.id === id);
    return this.lastPromise = Promise.resolve(hero);
  }

  getHeroes() {
    return this.lastPromise = Promise.resolve<Hero[]>(this.heroes);
  }

  updateHero(hero: Hero): Promise<Hero> {
    return this.lastPromise = this.getHero(hero.id).then(h => {
      return h ?
        Object.assign(h, hero) :
        Promise.reject(`Hero ${hero.id} not found`) as any as Promise<Hero>;
    });
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/