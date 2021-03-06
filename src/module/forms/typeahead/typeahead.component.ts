/**
 * Created by ketangote on 11/21/17.
 */

/*
Component Name : Amexio Typeahead Input
Component Selector :  <amexio-typeahead>
Component Description : Type Ahead Component provides a power type ahead on the
text field where users entry is provided with a filtered result.
*/

import {
  AfterViewInit, ChangeDetectorRef, Component, ContentChild,
  ElementRef, EventEmitter, forwardRef, HostListener, Input,
  OnChanges, OnInit, Output, QueryList, Renderer2,
  SimpleChanges, TemplateRef, ViewChild, ViewChildren,
} from '@angular/core';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel, Validators} from '@angular/forms';
import { CommonDataService } from '../../services/data/common.data.service';
import { DropDownListComponent } from './../../base/dropdownlist.component';
import { ListBaseComponent } from './../../base/list.base.component';

import { of } from 'rxjs';
@Component({
  selector: 'amexio-typeahead',
  templateUrl: './typeahead.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: AmexioTypeAheadComponent,
    multi: true,
  }, {
    provide: NG_VALIDATORS, useExisting: forwardRef(() => AmexioTypeAheadComponent), multi: true,
}],
})
export class AmexioTypeAheadComponent extends ListBaseComponent<string> implements OnChanges, OnInit, AfterViewInit, Validators {

  private _fieldlabel: string;
  private _haslabel: boolean;
  private _data: any;
  private _key: any;
  public viewdata: any;
  public displayValue = '';
  private componentLoaded: boolean;

  /*
   Properties
   name : field-label
   datatype : string
   version : 4.0 onwards
   default :
   description : The label of this field
   */
  @Input('field-label')
  set fieldlabel(v: string) {
    if (v != null && v.length > 0) {
      this._fieldlabel = v;
      this.initComponent();
    }
  }
  get fieldlabel() {
    return this._fieldlabel;
  }

  /*
   Properties
   name : has-label
   datatype : boolean
   version : 4.0 onwards
   default : false
   description : Flag to set label
   */
  @Input('has-label')
  set haslabel(v: boolean) {
    this._haslabel = v;
  }
  get haslabel(): boolean {
    return this._haslabel;
  }

  /*
   Properties
   name : data
   datatype : any
   version : 4.0 onwards
   default :
   description : Local data for dropdown.
   */
  @Input('data') data: any;

  @Input('key')
  set key(v: any) {
    this._key = v;
    this.displayfield = this._key;
  }
  get key(): any {
    return this._key;
  }

  @Input('allow-blank') allowblank: boolean;

  @Input('data-reader') datareader: string;

  @Input('http-method') httpmethod: string;

  @Input('http-url') httpurl: string;

  @Input('display-field') displayfield: string;

  @Input('value-field') valuefield: string;

  @Input('place-holder') placeholder: string;

  @Input('icon-feedback') iconfeedback: boolean;

  @Input('font-style') fontstyle: string;

  @Input('font-family') fontfamily: string;

  @Input('font-size') fontsize: string;

  @Input('enable-popover') enablepopover: boolean;

  @Input('trigger-char') triggerchar: number;

  @Input() name: string;

  @Input() disabled: boolean;

  @Output() onBlur: any = new EventEmitter<any>();

  @Output('input') onInputOutput: any = new EventEmitter<any>();

  @Output('focus') onFocusOutput: any = new EventEmitter<any>();

  @Output() change: any = new EventEmitter<any>();

  @Output() onClick: any = new EventEmitter<any>();

  @Output() isComponentValid: any = new EventEmitter<any>();

  @ViewChild(NgModel) model: NgModel;

  @ViewChildren(DropDownListComponent)
  private dropdownlist: QueryList<DropDownListComponent>;

  dropdown: DropDownListComponent[];

  @ContentChild('amexioBodyTmpl') bodyTemplate: TemplateRef<any>;

  rowindex = 0;

  maskloader = true;

  isValid: boolean;

  responseData: any;

  previousData: any;

  constructor(public dataService: CommonDataService, public element: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef) {
    super(renderer, element, cd);
  }

  ngAfterViewInit() {
    this.dropdown = this.dropdownlist.toArray();
    setTimeout(() => {
      this.dropdown.forEach((dropdown) => {
        dropdown.template = this.bodyTemplate;
      });
    }, 200);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.placeholder && !changes.placeholder.isFirstChange()) {
      this.placeholder = changes.placeholder.currentValue;
    }
  }

  ngOnInit() {
    this.name = this.generateName(this.name, this.fieldlabel, 'typeaheadinput');
    if (!this.valuefield) {
      this.valuefield = this.displayfield;
    }
    this.isValid = this.allowblank;
    this.isComponentValid.emit(this.allowblank);

    if (this.placeholder === '' || this.placeholder == null) {
      this.placeholder = 'Choose Option';
    }

    if (!this.triggerchar) {
      this.triggerchar = 1;
    }

    if (this.httpmethod && this.httpurl) {
      this.dataService.fetchData(this.httpurl, this.httpmethod).subscribe((response) => {
        this.responseData = response;
      }, (error) => {
      }, () => {
        this.setData(this.responseData);
      });

    } else if (this.data) {
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
    this.componentLoaded = true;
  }

  input(event: any) {
    this.displayValue = event.target.value;
    this.rowindex = 0;
    if (this.displayValue.length >= 0 && !this.self && this.displayValue.length >= this.triggerchar) {
      this.dropdownstyle = { visibility: 'visible' };
      this.bindDocumentClickListener();
    } else {
      this.dropdownstyle = { visibility: 'hidden' };
    }
    this.onInputOutput.emit(event);
  }

  focus(event: any) {
    this.self = true;
    this.dropdownstyle = { visibility: 'hidden' };
    this.bindDocumentClickListener();
    this.onFocusOutput.emit(event);
  }
  keyup(event: any) {
    const keycode: number = event.keyCode;
    if (keycode === 40) {
      this.rowindex++;
    } else if (keycode === 38) {
      this.rowindex--;
    } else if (keycode === 40 || keycode === 38) {
      this.rowindex = 0;
    }
    if (this.rowindex < 0) {
      this.rowindex = 0;
    } else if (this.rowindex >= this.viewdata.value.length) {
      this.rowindex = this.viewdata.value.length - 1;
    }

    if (keycode === 13) {
      const data = this.dropdown[0].selectedItem();
      this.value = data[0].attributes['valuefield'].value;
      this.displayValue = data[0].attributes['displayfield'].value;
      this.itemClicked();
      this.isComponentValid.emit(true);
    } else if (keycode === 40 || keycode === 38) {
      this.dropdown[0].scroll(this.rowindex);
    }
  }

  // METHOS FOR BLUR EVENT
  blur(event: any) {
    super.blur(event);
    const userinput: string = event.target.value;
    const listitems: any[] = this.viewdata.value;
    listitems.forEach((item) => {
      if ((item[this.displayfield] + '').toLowerCase() === userinput.toLowerCase()) {
        this.displayValue = item[this.displayfield];
        this.value = item[this.valuefield];
        this.isComponentValid.emit(true);
      }
    });
    this.onBlur.emit(event);
  }

  // METHOD TO DISPLAY ITEM WHEN SELECTED
  onDropDownListItemClick(data: any) {
    if (this.valuefield) {
      this.value = data[this.valuefield];
    }else {
      this.value = data[this.displayfield];
    }
    this.displayValue = data[this.displayfield];
    this.onClick.emit(data);
  }

  writeValue(v: any) {
    super.writeValue(v);
    if (v && this.viewdata) {
      this.showValue();
    }
  }

  private showValue() {
    const listitems: any[] = this.viewdata.value;
    listitems.forEach((item) => {
      if (item[this.valuefield] === this.value) {
        this.displayValue = item[this.displayfield];
        this.isComponentValid.emit(true);
      }
    });
  }

  // METHOD TO INITIALIZE COMPONENT
  initComponent() {
    if (this.fieldlabel != null && this.fieldlabel.length > 0) {
      this.haslabel = true;
    }
  }

  // METHOD TO EMIT CHANGE EVENT
  onChange(event: any) {
    if (event != null) {
      this.change.emit(event);
    }
  }

  // METHOD TO SET DATA IN DROPDOWN
  setData(httpResponse: any) {
    let responsedata = httpResponse;
    if (this.datareader != null) {
      const dr = this.datareader.split('.');
      for (const ir of dr) {
        responsedata = responsedata[ir];
      }
    } else {
      responsedata = httpResponse;
    }
    this.viewdata = of(responsedata);

    // SET USER SELECTION
    if (this.value != null) {
      const valueKey = this.valuefield;
      const displayKey = this.displayfield;
      const val = this.value;

      this.viewdata.forEach((item: any) => {
        if (item[valueKey] === val) {
          this.isValid = true;
          this.displayValue = item[displayKey];
        }
      });
    }
    this.maskloader = false;
  }

  public validate(c: FormControl) {
    return ((!this.allowblank && this.value) || this.allowblank) ? null : {
        jsonParseError: {
            valid: true,
        },
    };
 }
}
