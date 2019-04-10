import { Component, OnInit, NgModule, ViewChild, Inject } from '@angular/core';
import { LyTheme2, ThemeVariables, Platform } from '@alyle/ui';
import { ImgCropperConfig, ImgCropperEvent, LyResizingCroppingImages, ImgCropperErrorEvent } from '@alyle/ui/resizing-cropping-images';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-cropping-images',
  templateUrl: './cropping-images.component.html',
  styles: []
})
export class CroppingImagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
