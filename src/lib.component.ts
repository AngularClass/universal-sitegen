import { Component } from '@angular/core'

@Component({
  selector: 'lib',
  template: require('./lib.component.html')
})
export class LibComponent {
  action() {
    if (3 > 4) {
      console.log('hello')
    }
    return 'me'
  }
}
