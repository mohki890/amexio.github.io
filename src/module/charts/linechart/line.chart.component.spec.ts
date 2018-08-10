import { LineChartComponent } from './line.chart.component';
//import { AmexioFormIconComponent } from '../icon/icon.component';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonDataService } from '../../services/data/common.data.service';
import { ChartLoaderService } from './../chart.loader.service';
import { ChartTitleComponent } from '../charttitle/chart.title.component';
import {ChartLegendComponent} from '../chartlegend/chart.legend.component';
declare var google: any;
describe('LINE CHART', () => {
    //let ChartTitleComponent=new ChartTitleComponent()
    // let ChartTitleComponent = [{'name':'chart','title':'','position':'','color':'','fontname':'','fontsize':'','bold':false,'italic':''}];
    let linechartcomp: LineChartComponent;
    let charttitlecomp: ChartTitleComponent;
    let chartlegendcomp: ChartLegendComponent;
    let linefixture: ComponentFixture<LineChartComponent>;
    let charttitlefixture: ComponentFixture<ChartTitleComponent>;
    let chartlegendfixture:ComponentFixture<ChartLegendComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [LineChartComponent, ChartTitleComponent,ChartLegendComponent],
            providers: [IconLoaderService, CommonDataService, ChartLoaderService]
        });
        linefixture = TestBed.createComponent(LineChartComponent);
        charttitlefixture = TestBed.createComponent(ChartTitleComponent);
        chartlegendfixture=TestBed.createComponent(ChartLegendComponent);
        linechartcomp = linefixture.componentInstance;
        charttitlecomp = charttitlefixture.componentInstance;
        chartlegendcomp=chartlegendfixture.componentInstance;
        linechartcomp.chartTitleComponent = charttitlecomp;

    });
    it('show chart', () => {
        linechartcomp.showChart = false;
        charttitlecomp.title='';
        expect(false).toBe(linechartcomp.showChart);
        let newdata = [{ 'name': 'linechart' }];
        linechartcomp.data = newdata;
    });
    it('dont show chart', () => {
        let newdata;
        linechartcomp.data = newdata;
        expect(false).toBe(linechartcomp.showChart);
    });
    it('chartTitleTextStyle() properties',()=>{
        charttitlecomp.color='';
        charttitlecomp.fontname='';
        charttitlecomp.fontsize=10;
        charttitlecomp.bold=false;
        charttitlecomp.position='';
        charttitlecomp.title='';
        charttitlecomp.italic=false;
    });
    it('chartLegendStyle()',()=>{
        chartlegendcomp.position='';
        chartlegendcomp.alignment='';
        chartlegendcomp.color='';
        chartlegendcomp.fontname='';
        chartlegendcomp.fontsize='';
        chartlegendcomp.bold=false;
        chartlegendcomp.maxlines;
    });
    
    it('get data method',()=>{
        linechartcomp.data;
        expect(linechartcomp.data).toBe(linechartcomp._data);
    })
    // it('Draw Chart Test', () => {
    //     linechartcomp.showChart = true;
    //     let newdata = [{ name: 'linechart' }];
    //     linechartcomp.data = newdata;
    //     linechartcomp.drawChart();
    //     expect(false).toBe(linechartcomp.hasLoaded);
    //   //  google.visualization.events.addListener(this.chart, 'click', this.onClick);


    // });



});

