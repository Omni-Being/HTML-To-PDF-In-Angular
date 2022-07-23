export const OEE_and_Avail_ChartOptions =
{
	responsive: true,
	maintainAspectRatio: true,
	scales:
	{
		yAxes:
		[
			{
				gridLines:
				{
					display: false
				},
				ticks:
				{
					fontColor: 'black',
					beginAtZero: true,
					stepSize: 100,
					fontSize: 10,
					display: true
				}
			}
		],
		xAxes:
		[
			{
				barPercentage: 0.9,
				gridLines:
				{
					display: false
				},
				ticks:
				{
					fontColor: 'black',
					fontSize: 10,
					display: true
				}
			}
		]
	},
	plugins:
	{
		datalabels:
		{
			anchor: 'end',
			align: 'top',
			font:
			{
				weight: 'bold'
			}
		}
	},
	legend:
	{
		display: true
	},
	elements:
	{
		line: 
		{
			fill: false
		}
	}
};