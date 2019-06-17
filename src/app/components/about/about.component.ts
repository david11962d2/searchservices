import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $(document).ready(function() {
        var posicion = $(".top").offset().top;

        $("html, body").animate({
          scrollTop: posicion - 200
        }, 1000);

    });
  }

}
