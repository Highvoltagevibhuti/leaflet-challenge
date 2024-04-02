# leaflet-challenge

Your first task is to visualize an earthquake dataset. Complete the following steps:

1. Get your dataset. To do so, follow these steps:

The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON FeedLinks to an external site. page and choose a dataset to visualize. 

When you click a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data. Use the URL of this JSON to pull in the data for the visualization. 

Import and visualize the data by doing the following:

2. Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.

Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.

Hint: The depth of the earth can be found as the third coordinate for each earthquake.

Include popups that provide additional information about the earthquake when its associated marker is clicked.

Create a legend that will provide context for your map data.

Your visualization should look something like the preceding map.

**Please refer logic.js file that has been updated by me to complete the homework assignment.**

**References used to complete the homework:** 

1. Riana's activity 10 from module 15 day1:  https://git.bootcampcontent.com/Rutgers-University/PSEG-RUT-VIRT-DATA-PT-10-2023-U-LOLC/-/blob/main/01-Lesson-Plans/15-Mapping/1/Activities/10-Stu_GeoJson/Solved/logic.js

2. To get the hex codes for colors: https://www.color-hex.com/color-names.html

3. For legend: https://gis.stackexchange.com/questions/133630/adding-leaflet-legend
