import { Component } from '@angular/core';

import { ChartDataSets, ChartType, ChartOptions } from "chart.js";
import { Label } from "ng2-charts";

import { FasServiceService } from "./services/fas-service.service";

import { osdTrendChartOptions } from "./const/osd.data";
import { OEE_and_Avail_ChartOptions } from "./const/oa.data";
import { Scrap_Qty_Per_ChartOptions } from "./const/scrap_qty.data";

import jspdf from 'jspdf';
import html2canvas from 'html2canvas';



@Component(
{
  	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrls: ['./app.component.css']
})



export class AppComponent
{
	public element: any;

	//Details
  	public title = 'Plant Performance Report for Injection';
	public plant_name = "Botzingen, Germany";
	public current_date = "";
	
	//API Data
  	public all_data:any;
	public oee_avail_data:any;
	public scrap_per_data:any;

	//Graph Global Variables
	public ChartLegend = true;
	public ChartPlugins = [];

	//OEE Scrap Downtime Graph
	public oee_scrap_down_trend_ChartData: ChartDataSets[] = [];
	public oee_scrap_down_trend_ChartLabels: Label[] = [];
	public oee_scrap_down_trend_ChartOptions: ChartOptions = osdTrendChartOptions;
	public oee_scrap_down_trend_ChartType: ChartType = "line";

	//OEE Availability Trend Graph
	public oee_avail_trend_ChartData: ChartDataSets[] = [];
	public oee_avail_trend_ChartLabels: Label[] = [];
	public oee_avail_trend_ChartOptions: ChartOptions = OEE_and_Avail_ChartOptions;
	public oee_avail_trend_ChartType: ChartType = "bar";

	//Scrap Quantity Percentage Graph
	public scrap_qty_ChartData: ChartDataSets[] = [];
	public scrap_qty_ChartLabels: Label[] = [];
	public scrap_qty_ChartOptions: ChartOptions = Scrap_Qty_Per_ChartOptions;
	public scrap_qty_ChartType: ChartType = "bar";


	constructor(private fas_dataapi:FasServiceService)
	{
		let temp_date=new Date();
		this.current_date=temp_date.toDateString();
	}


	ngOnInit():void
	{
		this.fas_dataapi.getAllData().subscribe(res=>
		{
			this.all_data=res;
			this.loadOEEScarpDowntimeTrendGraph(this.all_data);
		});

		this.fas_dataapi.getOEEData().subscribe(res=>
		{
			this.oee_avail_data=res;
			this.loadOEEAvailGraph(this.oee_avail_data);
		});

		this.fas_dataapi.getScrapData().subscribe(res=>
		{
			this.scrap_per_data=res;
			this.loadScrapPercentageGraph(this.scrap_per_data);
		});
	}


	loadOEEScarpDowntimeTrendGraph(param:any)
	{
		let temp_scrap_val: Array<any> = [];
		let temp_oee: Array<any> = [];
		let temp_down: Array<any> = [];

		for(let i of param)
		{
			this.oee_scrap_down_trend_ChartLabels.push(i.date);
			temp_scrap_val.push(i.Scrap_Value_in);
			temp_oee.push(i.Oee);
			temp_down.push(i.Downtime);
		}

		this.oee_scrap_down_trend_ChartData=
		[
			{
				data: temp_down,
				label: 'Downtime',
				backgroundColor: 'rgba(60,141,163,.6)',
				borderColor: 'transparent',
				hoverBackgroundColor:'rgba(60,141,163,.6)',
				hoverBorderColor:"transparent",
				pointBackgroundColor: 'transparent',
				pointBorderColor: 'transparent',
				pointHoverBackgroundColor: 'rgba(60,141,163,1)',
				pointHoverBorderColor: 'transparent'
			},
			{
				data: temp_oee,
				label: 'OEE',
				backgroundColor: 'rgba(166,220,216,.6)',
				borderColor: 'transparent',
				hoverBackgroundColor:'rgba(166,220,216,.6)',
				hoverBorderColor:"transparent",
				pointBackgroundColor: 'transparent',
				pointBorderColor: 'transparent',
				pointHoverBackgroundColor: 'rgba(166,220,216,1)',
				pointHoverBorderColor: 'transparent'
			},
			{
				data: temp_scrap_val,
				label: 'Scrap Value',
				backgroundColor: 'rgba(75,172,198,.6)',
				borderColor: 'transparent',
				hoverBackgroundColor:'rgba(75,172,198,.6)',
				hoverBorderColor:"transparent",
				pointBackgroundColor: 'transparent',
				pointBorderColor: 'transparent',
				pointHoverBackgroundColor: 'rgba(75,172,198,1)',
				pointHoverBorderColor: 'transparent'
			}
		]
	}


	loadOEEAvailGraph(param:any)
	{
		let temp_avail: Array<any> = [];
		let temp_oee: Array<any> = [];

		for(let i of param)
		{
			this.oee_avail_trend_ChartLabels.push(i.REGION);
			temp_avail.push(i.Availability);
			temp_oee.push(i.OEE);
		}

		this.oee_avail_trend_ChartData=
		[
			{
				data: temp_avail,
				label: 'Availability',
				backgroundColor: 'rgb(255,193,7)',
				borderColor: 'transparent',
				hoverBackgroundColor:'rgba(255,193,7,.6)',
				hoverBorderColor:"transparent",
				pointBackgroundColor: 'transparent',
				pointBorderColor: 'transparent',
				pointHoverBackgroundColor: 'rgb(255,193,7)',
				pointHoverBorderColor: 'transparent'
			},
			{
				data: temp_oee,
				label: 'OEE',
				backgroundColor: 'rgb(220,53,69)',
				borderColor: 'transparent',
				hoverBackgroundColor:'rgba(220,53,69,.6)',
				hoverBorderColor:"transparent",
				pointBackgroundColor: 'transparent',
				pointBorderColor: 'transparent',
				pointHoverBackgroundColor: 'rgb(220,53,69)',
				pointHoverBorderColor: 'transparent'
			}
		]
	}


	loadScrapPercentageGraph(param:any)
	{
		let temp_scrap_value: Array<any> = [];

		for(let i of param)
		{
			this.scrap_qty_ChartLabels.push(i.REGION);
			temp_scrap_value.push(i.REV_VALUE);	
		}

		this.scrap_qty_ChartData=
		[
			{
				data: temp_scrap_value,
				label: 'Scrap %',
				backgroundColor: 'rgb(25,135,84)',
				borderColor: 'transparent',
				hoverBackgroundColor:'rgba(25,135,84,.6)',
				hoverBorderColor:"transparent",
				pointBackgroundColor: 'transparent',
				pointBorderColor: 'transparent',
				pointHoverBackgroundColor: 'rgb(25,135,84)',
				pointHoverBorderColor: 'transparent'
			}
		]
	}

	public convetToPDF()
	{
		this.element = document.getElementById('my_shit') as HTMLElement;
		
		html2canvas(this.element).then((canvas)=>
		{
			console.log(canvas);

			var imgWidth = 208;
			var imgHeight = canvas.height * imgWidth / canvas.width;

			let scr_shot = canvas.toDataURL('image/jpg');

			let out_pdf = new jspdf();
			out_pdf.addImage(scr_shot,1,0,imgWidth,imgHeight);
			out_pdf.save("temp.pdf");
		})
	}
}