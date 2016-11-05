import { async, inject, ComponentFixture, TestBed} from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement,NO_ERRORS_SCHEMA }    from '@angular/core';
import { FakeHeroService } from './fake-hero.service'
import { HeroService } from './hero.service'
import { Router } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HttpModule } from '@angular/http';

class RouterStub {
  navigate(url: string[]) { return url; }
}

let comp: DashboardComponent;
let fixture: ComponentFixture<DashboardComponent>;

describe('2nd tests', () => {

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [ DashboardComponent ],
      schemas:      [NO_ERRORS_SCHEMA],
      providers: [
        { provide: HeroService, useClass: FakeHeroService },
        { provide: Router,      useClass: RouterStub }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(DashboardComponent);
      comp = fixture.componentInstance;
    });
  }));

  // Trigger component so it gets heroes and binds to them
  beforeEach( async(() => {
    fixture.detectChanges(); // runs ngOnInit -> getHeroes
    fixture.whenStable() // No need for the `lastPromise` hack!
      .then(() => fixture.detectChanges()); // bind to heroes
  }));

  it('should tell ROUTER to navigate when hero clicked',
    inject([Router], (router: Router) => { // ...

      const spy = spyOn(router, 'navigate');

      const heroEl = fixture.debugElement.query(By.css('.col-1-4'));
      heroEl.triggerEventHandler('click', comp.heroes[0]);

      // args passed to router.navigateByUrl()
      const navArgs = spy.calls.first().args[0];

      // expecting to navigate to id of the component's first hero
      const id = comp.heroes[0].id;
      expect(navArgs[0]).toBe('/detail',
        'should nav to HeroDetail for first hero');
      expect(navArgs[1]).toBe(id,
        'should nav to HeroDetail for first hero');
    }));

});
