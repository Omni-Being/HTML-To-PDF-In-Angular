import { Chart } from "chart.js";

export const osdTrendChartOptions =
{
  	responsive: true,
  	maintainAspectRatio: true,
	animations:
	{
		tension:
		{
		  	duration: 200,
		  	easing: 'linear',
		  	loop: false
		}
	},
  	scales:
	{
    	yAxes: 
		[
			{
				position: 'left',
      			gridLines:
				{
        			display: false
      			},
      			ticks:
				{	
					fontColor: 'black',
					display: true,
					beginAtZero: true,
					stepSize: 10,
					fontSize: 10
      			}
    		}
		],
    	xAxes:
		[
			{
				position: 'bottom',
      			gridLines:
				{
        			display: false
      			},
      			ticks:
				{
					fontColor: 'black',
					display: true,
					fontSize: 10
      			}
    		}
		]
  	},
	legend:
	{
		display: true
	},
	plugins:
	{
    	datalabels:
		{
      		anchor: 'start',
      		align: 'top',
      		font:
			{
        		weight: 'bold'
      		}
    	}
  	},
	elements:
	{
		line:
		{
			fill: true,
			tension: .5,
		}
	}
};