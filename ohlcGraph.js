// var ctx = document.getElementById("canvasId").getContext("2d");
//
// var graph = new BarGraph(ctx);
// // graph.margin = "auto";
// graph.width = 450;
// graph.height = 150;
// graph.xAxisLabelArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// graph.update([3, 5, 3, 4, 4, 13, 2]);
//
// // Copyright 2011 William Malone (www.williammalone.com)
// //
// // Licensed under the Apache License, Version 2.0 (the "License");
// // you may not use this file except in compliance with the License.
// // You may obtain a copy of the License at
// //
// //   http://www.apache.org/licenses/LICENSE-2.0
// //
// // Unless required by applicable law or agreed to in writing, software
// // distributed under the License is distributed on an "AS IS" BASIS,
// // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// // See the License for the specific language governing permissions and
// // limitations under the License.
//
// function BarGraph(ctx) {
//
//     // Private properties and methods
//
//     var that = this;
//     var startArr;
//     var endArr;
//     var looping = false;
//
//     // Loop method adjusts the height of bar and redraws if neccessary
//     var loop = function () {
//
//         var delta;
//         var animationComplete = true;
//
//         // Boolean to prevent update function from looping if already looping
//         looping = true;
//
//         // For each bar
//         for (var i = 0; i < endArr.length; i += 1) {
//             // Change the current bar height toward its target height
//             delta = (endArr[i] - startArr[i]) / that.animationSteps;
//             that.curArr[i] += delta;
//             // If any change is made then flip a switch
//             if (delta) {
//                 animationComplete = false;
//             }
//         }
//         // If no change was made to any bars then we are done
//         if (animationComplete) {
//             looping = false;
//         } else {
//             // Draw and call loop again
//             draw(that.curArr);
//             setTimeout(loop, that.animationInterval / that.animationSteps);
//         }
//     };
//
//     // Draw method updates the canvas with the current display
//     var draw = function (arr) {
//
//         var numOfBars = arr.length;
//         var barWidth;
//         var barHeight;
//         var border = 2;
//         var ratio;
//         var maxBarHeight;
//         var gradient;
//         var largestValue;
//         var graphAreaX = 0;
//         var graphAreaY = 0;
//         var graphAreaWidth = that.width;
//         var graphAreaHeight = that.height;
//         var i;
//
//         // Update the dimensions of the canvas only if they have changed
//         if (ctx.canvas.width !== that.width || ctx.canvas.height !== that.height) {
//             ctx.canvas.width = that.width;
//             ctx.canvas.height = that.height;
//         }
//
//         // Draw the background color
//         ctx.fillStyle = that.backgroundColor;
//         ctx.fillRect(0, 0, that.width, that.height);
//
//         // If x axis labels exist then make room
//         if (that.xAxisLabelArr.length) {
//             graphAreaHeight -= 40;
//         }
//
//         // Calculate dimensions of the bar
//         barWidth = graphAreaWidth / numOfBars - that.margin * 2;
//         maxBarHeight = graphAreaHeight - 25;
//
//         // Determine the largest value in the bar array
//         var largestValue = 0;
//         for (i = 0; i < arr.length; i += 1) {
//             if (arr[i] > largestValue) {
//                 largestValue = arr[i];
//             }
//         }
//
//         // For each bar
//         for (i = 0; i < arr.length; i += 1) {
//             // Set the ratio of current bar compared to the maximum
//             if (that.maxValue) {
//                 ratio = arr[i] / that.maxValue;
//             } else {
//                 ratio = arr[i] / largestValue;
//             }
//
//             barHeight = ratio * maxBarHeight;
//
//             // Turn on shadow
//             ctx.shadowOffsetX = 2;
//             ctx.shadowOffsetY = 2;
//             ctx.shadowBlur = 2;
//             ctx.shadowColor = "#999";
//
//             // Draw bar background
//             ctx.fillStyle = "#333";
//             ctx.fillRect(that.margin + i * that.width / numOfBars,
//                 graphAreaHeight - barHeight,
//                 barWidth,
//                 barHeight);
//
//             // Turn off shadow
//             ctx.shadowOffsetX = 0;
//             ctx.shadowOffsetY = 0;
//             ctx.shadowBlur = 0;
//
//             // Draw bar color if it is large enough to be visible
//             if (barHeight > border * 2) {
//                 // Create gradient
//                 gradient = ctx.createLinearGradient(0, 0, 0, graphAreaHeight);
//                 gradient.addColorStop(1-ratio, that.colors[i % that.colors.length]);
//                 gradient.addColorStop(1, "#ffffff");
//
//                 ctx.fillStyle = gradient;
//                 // Fill rectangle with gradient
//                 ctx.fillRect(that.margin + i * that.width / numOfBars + border,
//                     graphAreaHeight - barHeight + border,
//                     barWidth - border * 2,
//                     barHeight - border * 2);
//             }
//
//             // Write bar value
//             ctx.fillStyle = "#333";
//             ctx.font = "bold 12px sans-serif";
//             ctx.textAlign = "center";
//             // Use try / catch to stop IE 8 from going to error town
//             try {
//                 ctx.fillText(parseInt(arr[i],10),
//                     i * that.width / numOfBars + (that.width / numOfBars) / 2,
//                     graphAreaHeight - barHeight - 10);
//             } catch (ex) {}
//             // Draw bar label if it exists
//             if (that.xAxisLabelArr[i]) {
//                 // Use try / catch to stop IE 8 from going to error town
//                 ctx.fillStyle = "#333";
//                 ctx.font = "bold 12px sans-serif";
//                 ctx.textAlign = "center";
//                 try{
//                     ctx.fillText(that.xAxisLabelArr[i],
//                         i * that.width / numOfBars + (that.width / numOfBars) / 2,
//                         that.height - 10);
//                 } catch (ex) {}
//             }
//         }
//     };
//
//     // Public properties and methods
//
//     this.width = 300;
//     this.height = 150;
//     this.maxValue;
//     this.margin = 5;
//     this.colors = ["purple", "red", "green", "yellow"];
//     this.curArr = [];
//     this.backgroundColor = "#fff";
//     this.xAxisLabelArr = [];
//     this.yAxisLabelArr = [];
//     this.animationInterval = 100;
//     this.animationSteps = 10;
//
//     // Update method sets the end bar array and starts the animation
//     this.update = function (newArr) {
//
//         // If length of target and current array is different
//         if (that.curArr.length !== newArr.length) {
//             that.curArr = newArr;
//             draw(newArr);
//         } else {
//             // Set the starting array to the current array
//             startArr = that.curArr;
//             // Set the target array to the new array
//             endArr = newArr;
//             // Animate from the start array to the end array
//             if (!looping) {
//                 loop();
//             }
//         }
//     };
// }

data = {
  "Meta Data": {
    "1. Information": "Daily Prices (open, high, low, close) and Volumes",
    "2. Symbol": "MSFT",
    "3. Last Refreshed": "2018-09-28",
    "4. Output Size": "Compact",
    "5. Time Zone": "US/Eastern"
  },
  "Time Series (Daily)": {
    "2018-09-28": {
      "1. open": "114.1900",
      "2. high": "114.5700",
      "3. low": "113.6800",
      "4. close": "114.3700",
      "5. volume": "20491725"
    },
    "2018-09-27": {
      "1. open": "114.7800",
      "2. high": "114.9100",
      "3. low": "114.2000",
      "4. close": "114.4100",
      "5. volume": "19091299"
    },
    "2018-09-26": {
      "1. open": "114.4700",
      "2. high": "115.0550",
      "3. low": "113.7400",
      "4. close": "113.9800",
      "5. volume": "19352025"
    },
    "2018-09-25": {
      "1. open": "114.8000",
      "2. high": "115.1000",
      "3. low": "113.7500",
      "4. close": "114.4500",
      "5. volume": "22668014"
    },
    "2018-09-24": {
      "1. open": "113.0300",
      "2. high": "114.9000",
      "3. low": "112.2175",
      "4. close": "114.6700",
      "5. volume": "27334460"
    },
    "2018-09-21": {
      "1. open": "114.0000",
      "2. high": "115.2900",
      "3. low": "113.5100",
      "4. close": "114.2600",
      "5. volume": "71229698"
    },
    "2018-09-20": {
      "1. open": "112.2800",
      "2. high": "113.8000",
      "3. low": "111.9300",
      "4. close": "113.5700",
      "5. volume": "23714512"
    },
    "2018-09-19": {
      "1. open": "113.0500",
      "2. high": "113.3200",
      "3. low": "111.0350",
      "4. close": "111.7000",
      "5. volume": "21728429"
    },
    "2018-09-18": {
      "1. open": "112.1900",
      "2. high": "113.6950",
      "3. low": "111.7200",
      "4. close": "113.2100",
      "5. volume": "22170934"
    },
    "2018-09-17": {
      "1. open": "113.6900",
      "2. high": "113.7000",
      "3. low": "111.8600",
      "4. close": "112.1400",
      "5. volume": "20736516"
    },
    "2018-09-14": {
      "1. open": "113.3600",
      "2. high": "113.7300",
      "3. low": "112.4400",
      "4. close": "113.3700",
      "5. volume": "19122349"
    },
    "2018-09-13": {
      "1. open": "112.1200",
      "2. high": "113.7250",
      "3. low": "112.1200",
      "4. close": "112.9100",
      "5. volume": "26055620"
    },
    "2018-09-12": {
      "1. open": "111.4300",
      "2. high": "111.8500",
      "3. low": "110.5100",
      "4. close": "111.7100",
      "5. volume": "18891064"
    },
    "2018-09-11": {
      "1. open": "108.9000",
      "2. high": "111.5900",
      "3. low": "108.8900",
      "4. close": "111.2400",
      "5. volume": "24301774"
    },
    "2018-09-10": {
      "1. open": "108.8400",
      "2. high": "109.6400",
      "3. low": "108.3600",
      "4. close": "109.3800",
      "5. volume": "20727906"
    },
    "2018-09-07": {
      "1. open": "108.2300",
      "2. high": "108.7248",
      "3. low": "107.2300",
      "4. close": "108.2100",
      "5. volume": "22498646"
    },
    "2018-09-06": {
      "1. open": "108.2500",
      "2. high": "108.9900",
      "3. low": "107.5100",
      "4. close": "108.7400",
      "5. volume": "23477624"
    },
    "2018-09-05": {
      "1. open": "111.0100",
      "2. high": "111.4200",
      "3. low": "108.1000",
      "4. close": "108.4900",
      "5. volume": "32872352"
    },
    "2018-09-04": {
      "1. open": "110.8500",
      "2. high": "111.9550",
      "3. low": "110.2200",
      "4. close": "111.7100",
      "5. volume": "22634641"
    },
    "2018-08-31": {
      "1. open": "111.6850",
      "2. high": "112.7770",
      "3. low": "111.5150",
      "4. close": "112.3300",
      "5. volume": "23222713"
    },
    "2018-08-30": {
      "1. open": "111.6700",
      "2. high": "112.6100",
      "3. low": "111.4400",
      "4. close": "111.9500",
      "5. volume": "22798702"
    },
    "2018-08-29": {
      "1. open": "110.4500",
      "2. high": "112.0300",
      "3. low": "110.2700",
      "4. close": "112.0200",
      "5. volume": "20818044"
    },
    "2018-08-28": {
      "1. open": "109.9400",
      "2. high": "110.5000",
      "3. low": "109.7900",
      "4. close": "110.2600",
      "5. volume": "19151528"
    },
    "2018-08-27": {
      "1. open": "109.2700",
      "2. high": "109.6400",
      "3. low": "108.5100",
      "4. close": "109.6000",
      "5. volume": "19662331"
    },
    "2018-08-24": {
      "1. open": "107.6700",
      "2. high": "108.5600",
      "3. low": "107.5600",
      "4. close": "108.4000",
      "5. volume": "17234020"
    },
    "2018-08-23": {
      "1. open": "107.1500",
      "2. high": "108.1800",
      "3. low": "106.8700",
      "4. close": "107.5600",
      "5. volume": "18167723"
    },
    "2018-08-22": {
      "1. open": "105.8500",
      "2. high": "107.3400",
      "3. low": "105.7800",
      "4. close": "107.0600",
      "5. volume": "18000639"
    },
    "2018-08-21": {
      "1. open": "106.9200",
      "2. high": "107.3500",
      "3. low": "105.8500",
      "4. close": "105.9800",
      "5. volume": "22881861"
    },
    "2018-08-20": {
      "1. open": "107.5100",
      "2. high": "107.9000",
      "3. low": "106.4800",
      "4. close": "106.8700",
      "5. volume": "17914201"
    },
    "2018-08-17": {
      "1. open": "107.3600",
      "2. high": "107.9000",
      "3. low": "106.6900",
      "4. close": "107.5800",
      "5. volume": "18061512"
    },
    "2018-08-16": {
      "1. open": "108.3000",
      "2. high": "108.8600",
      "3. low": "107.3000",
      "4. close": "107.6400",
      "5. volume": "21384289"
    },
    "2018-08-15": {
      "1. open": "108.4900",
      "2. high": "108.9850",
      "3. low": "106.8200",
      "4. close": "107.6600",
      "5. volume": "29982806"
    },
    "2018-08-14": {
      "1. open": "108.1381",
      "2. high": "109.3235",
      "3. low": "107.6202",
      "4. close": "109.1342",
      "5. volume": "16788314"
    },
    "2018-08-13": {
      "1. open": "108.8155",
      "2. high": "109.1542",
      "3. low": "107.6799",
      "4. close": "107.7895",
      "5. volume": "18474884"
    },
    "2018-08-10": {
      "1. open": "108.9948",
      "2. high": "109.2637",
      "3. low": "107.9588",
      "4. close": "108.5764",
      "5. volume": "18183724"
    },
    "2018-08-09": {
      "1. open": "109.2837",
      "2. high": "109.7319",
      "3. low": "109.1741",
      "4. close": "109.2438",
      "5. volume": "13677211"
    },
    "2018-08-08": {
      "1. open": "108.9051",
      "2. high": "109.3235",
      "3. low": "108.3373",
      "4. close": "109.0645",
      "5. volume": "15487502"
    },
    "2018-08-07": {
      "1. open": "108.1381",
      "2. high": "108.6760",
      "3. low": "107.7497",
      "4. close": "108.4569",
      "5. volume": "16080214"
    },
    "2018-08-06": {
      "1. open": "107.6998",
      "2. high": "107.9987",
      "3. low": "107.1410",
      "4. close": "107.7098",
      "5. volume": "20265947"
    },
    "2018-08-03": {
      "1. open": "107.3811",
      "2. high": "107.6301",
      "3. low": "106.4049",
      "4. close": "107.6202",
      "5. volume": "18659599"
    },
    "2018-08-02": {
      "1. open": "104.9904",
      "2. high": "107.6700",
      "3. low": "104.4326",
      "4. close": "107.1520",
      "5. volume": "26104258"
    },
    "2018-08-01": {
      "1. open": "105.6180",
      "2. high": "106.0323",
      "3. low": "105.0103",
      "4. close": "105.8670",
      "5. volume": "23628699"
    },
    "2018-07-31": {
      "1. open": "106.0762",
      "2. high": "106.3053",
      "3. low": "104.9705",
      "4. close": "105.6678",
      "5. volume": "27655152"
    },
    "2018-07-30": {
      "1. open": "106.7735",
      "2. high": "107.1121",
      "3. low": "104.3529",
      "4. close": "104.9605",
      "5. volume": "34668327"
    },
    "2018-07-27": {
      "1. open": "109.7518",
      "2. high": "109.7518",
      "3. low": "105.7275",
      "4. close": "107.2616",
      "5. volume": "37005292"
    },
    "2018-07-26": {
      "1. open": "110.3097",
      "2. high": "110.5687",
      "3. low": "109.0745",
      "4. close": "109.1940",
      "5. volume": "31372110"
    },
    "2018-07-25": {
      "1. open": "107.5355",
      "2. high": "110.7181",
      "3. low": "107.1819",
      "4. close": "110.3993",
      "5. volume": "30798058"
    },
    "2018-07-24": {
      "1. open": "108.1481",
      "2. high": "108.3971",
      "3. low": "106.8432",
      "4. close": "107.2416",
      "5. volume": "26316619"
    },
    "2018-07-23": {
      "1. open": "105.8869",
      "2. high": "107.7198",
      "3. low": "105.7176",
      "4. close": "107.5504",
      "5. volume": "29706955"
    },
    "2018-07-20": {
      "1. open": "107.6600",
      "2. high": "107.7795",
      "3. low": "105.6678",
      "4. close": "105.8570",
      "5. volume": "56038827"
    },
    "2018-07-19": {
      "1. open": "104.5222",
      "2. high": "104.9008",
      "3. low": "103.4863",
      "4. close": "103.9943",
      "5. volume": "40171646"
    },
    "2018-07-18": {
      "1. open": "105.5283",
      "2. high": "105.6379",
      "3. low": "104.3081",
      "4. close": "104.7115",
      "5. volume": "29493927"
    },
    "2018-07-17": {
      "1. open": "104.2035",
      "2. high": "106.0861",
      "3. low": "103.9146",
      "4. close": "105.5383",
      "5. volume": "25901726"
    },
    "2018-07-16": {
      "1. open": "104.9904",
      "2. high": "105.4088",
      "3. low": "104.1089",
      "4. close": "104.5023",
      "5. volume": "21786912"
    },
    "2018-07-13": {
      "1. open": "103.9644",
      "2. high": "105.1896",
      "3. low": "103.6855",
      "4. close": "105.0203",
      "5. volume": "24653500"
    },
    "2018-07-12": {
      "1. open": "102.3706",
      "2. high": "104.0043",
      "3. low": "102.3308",
      "4. close": "103.7851",
      "5. volume": "24335929"
    },
    "2018-07-11": {
      "1. open": "100.7569",
      "2. high": "101.9423",
      "3. low": "100.7071",
      "4. close": "101.5837",
      "5. volume": "19644648"
    },
    "2018-07-10": {
      "1. open": "101.6036",
      "2. high": "102.1116",
      "3. low": "101.4642",
      "4. close": "101.7232",
      "5. volume": "19293140"
    },
    "2018-07-09": {
      "1. open": "101.2502",
      "2. high": "101.8527",
      "3. low": "100.8575",
      "4. close": "101.4542",
      "5. volume": "18211980"
    },
    "2018-07-06": {
      "1. open": "99.4968",
      "2. high": "101.0358",
      "3. low": "99.2827",
      "4. close": "100.7669",
      "5. volume": "19234627"
    },
    "2018-07-05": {
      "1. open": "99.1133",
      "2. high": "99.5317",
      "3. low": "98.6451",
      "4. close": "99.3723",
      "5. volume": "18977402"
    },
    "2018-07-03": {
      "1. open": "100.0895",
      "2. high": "100.2390",
      "3. low": "98.5555",
      "4. close": "98.6651",
      "5. volume": "14670275"
    },
    "2018-07-02": {
      "1. open": "97.7188",
      "2. high": "99.6712",
      "3. low": "97.6192",
      "4. close": "99.6214",
      "5. volume": "19564521"
    },
    "2018-06-29": {
      "1. open": "98.5456",
      "2. high": "99.5217",
      "3. low": "97.9479",
      "4. close": "98.2268",
      "5. volume": "28053214"
    },
    "2018-06-28": {
      "1. open": "97.0016",
      "2. high": "98.7249",
      "3. low": "96.8820",
      "4. close": "98.2467",
      "5. volume": "26650671"
    },
    "2018-06-27": {
      "1. open": "99.1930",
      "2. high": "99.6313",
      "3. low": "97.0215",
      "4. close": "97.1610",
      "5. volume": "31298386"
    },
    "2018-06-26": {
      "1. open": "98.4360",
      "2. high": "99.6911",
      "3. low": "98.3663",
      "4. close": "98.6950",
      "5. volume": "26897244"
    },
    "2018-06-25": {
      "1. open": "99.6114",
      "2. high": "99.7210",
      "3. low": "96.9219",
      "4. close": "98.0077",
      "5. volume": "35433333"
    },
    "2018-06-22": {
      "1. open": "100.0198",
      "2. high": "100.3784",
      "3. low": "99.2379",
      "4. close": "100.0198",
      "5. volume": "38923105"
    },
    "2018-06-21": {
      "1. open": "101.6783",
      "2. high": "102.0618",
      "3. low": "100.4880",
      "4. close": "100.7470",
      "5. volume": "23198188"
    },
    "2018-06-20": {
      "1. open": "100.9761",
      "2. high": "102.1216",
      "3. low": "100.7270",
      "4. close": "101.4741",
      "5. volume": "26180792"
    },
    "2018-06-19": {
      "1. open": "99.2628",
      "2. high": "100.6075",
      "3. low": "99.1133",
      "4. close": "100.4681",
      "5. volume": "28653087"
    },
    "2018-06-18": {
      "1. open": "99.6214",
      "2. high": "100.7171",
      "3. low": "99.0337",
      "4. close": "100.4681",
      "5. volume": "23586037"
    },
    "2018-06-15": {
      "1. open": "101.1155",
      "2. high": "101.1355",
      "3. low": "99.6811",
      "4. close": "99.7409",
      "5. volume": "65738585"
    },
    "2018-06-14": {
      "1. open": "101.2550",
      "2. high": "101.6335",
      "3. low": "100.6075",
      "4. close": "101.0259",
      "5. volume": "25691811"
    },
    "2018-06-13": {
      "1. open": "101.3247",
      "2. high": "101.6136",
      "3. low": "100.1692",
      "4. close": "100.4581",
      "5. volume": "29492875"
    },
    "2018-06-12": {
      "1. open": "100.7071",
      "2. high": "101.0551",
      "3. low": "100.3585",
      "4. close": "100.9163",
      "5. volume": "18325228"
    },
    "2018-06-11": {
      "1. open": "100.9761",
      "2. high": "101.1952",
      "3. low": "100.2788",
      "4. close": "100.6573",
      "5. volume": "23490894"
    },
    "2018-06-08": {
      "1. open": "100.6996",
      "2. high": "101.5538",
      "3. low": "100.1493",
      "4. close": "101.2351",
      "5. volume": "22165128"
    },
    "2018-06-07": {
      "1. open": "102.2511",
      "2. high": "102.2909",
      "3. low": "99.9899",
      "4. close": "100.4880",
      "5. volume": "28232197"
    },
    "2018-06-06": {
      "1. open": "102.0818",
      "2. high": "102.2013",
      "3. low": "101.5040",
      "4. close": "102.0917",
      "5. volume": "21122917"
    },
    "2018-06-05": {
      "1. open": "101.6036",
      "2. high": "101.9323",
      "3. low": "101.1355",
      "4. close": "101.7929",
      "5. volume": "23514402"
    },
    "2018-06-04": {
      "1. open": "100.8665",
      "2. high": "101.4642",
      "3. low": "100.4591",
      "4. close": "101.2749",
      "5. volume": "27281623"
    },
    "2018-06-01": {
      "1. open": "98.8940",
      "2. high": "100.4681",
      "3. low": "98.7846",
      "4. close": "100.3983",
      "5. volume": "28655624"
    },
    "2018-05-31": {
      "1. open": "98.9042",
      "2. high": "99.6014",
      "3. low": "98.2268",
      "4. close": "98.4559",
      "5. volume": "34140891"
    },
    "2018-05-30": {
      "1. open": "97.9280",
      "2. high": "98.8643",
      "3. low": "97.5295",
      "4. close": "98.5655",
      "5. volume": "22158528"
    },
    "2018-05-29": {
      "1. open": "97.4598",
      "2. high": "98.4958",
      "3. low": "96.8522",
      "4. close": "97.6291",
      "5. volume": "28670981"
    },
    "2018-05-25": {
      "1. open": "97.9180",
      "2. high": "98.5954",
      "3. low": "97.4797",
      "4. close": "97.9778",
      "5. volume": "18363918"
    },
    "2018-05-24": {
      "1. open": "98.3414",
      "2. high": "98.5555",
      "3. low": "96.4338",
      "4. close": "97.9280",
      "5. volume": "26649287"
    },
    "2018-05-23": {
      "1. open": "96.3342",
      "2. high": "98.3463",
      "3. low": "95.9457",
      "4. close": "98.2766",
      "5. volume": "21251222"
    },
    "2018-05-22": {
      "1. open": "97.3004",
      "2. high": "97.7885",
      "3. low": "96.8223",
      "4. close": "97.1211",
      "5. volume": "15441189"
    },
    "2018-05-21": {
      "1. open": "96.6231",
      "2. high": "97.6291",
      "3. low": "96.4238",
      "4. close": "97.2207",
      "5. volume": "19422467"
    },
    "2018-05-18": {
      "1. open": "95.6369",
      "2. high": "96.5533",
      "3. low": "95.6369",
      "4. close": "95.9855",
      "5. volume": "17865840"
    },
    "2018-05-17": {
      "1. open": "96.3840",
      "2. high": "97.1611",
      "3. low": "95.4576",
      "4. close": "95.8062",
      "5. volume": "17246716"
    },
    "2018-05-16": {
      "1. open": "96.9817",
      "2. high": "97.0215",
      "3. low": "96.2396",
      "4. close": "96.7725",
      "5. volume": "17384742"
    },
    "2018-05-15": {
      "1. open": "96.4452",
      "2. high": "97.0502",
      "3. low": "95.5525",
      "4. close": "96.5245",
      "5. volume": "24594010"
    },
    "2018-05-14": {
      "1. open": "97.1196",
      "2. high": "97.8833",
      "3. low": "96.5146",
      "4. close": "97.2287",
      "5. volume": "19454124"
    },
    "2018-05-11": {
      "1. open": "97.0006",
      "2. high": "97.0700",
      "3. low": "96.2468",
      "4. close": "96.9014",
      "5. volume": "16778316"
    },
    "2018-05-10": {
      "1. open": "96.6634",
      "2. high": "97.1494",
      "3. low": "96.2567",
      "4. close": "97.1097",
      "5. volume": "22388119"
    },
    "2018-05-09": {
      "1. open": "95.2252",
      "2. high": "96.1774",
      "3. low": "94.2731",
      "4. close": "96.1476",
      "5. volume": "27327410"
    }
  }
};

function createCircle()
{
  var myCircle = document.createElementNS(svgNS,"circle"); //to create a circle. for rectangle use "rectangle"
  myCircle.setAttribute("id","mycircle");
  myCircle.setAttributeNS(null,"cx",100);
  myCircle.setAttributeNS(null,"cy",100);
  myCircle.setAttributeNS(null,"r",50);
  myCircle.setAttributeNS(null,"fill","black");
  myCircle.setAttributeNS(null,"stroke","none");

  document.getElementsByClassName('chart')[0].appendChild(myCircle);
}

let graph = document.getElementsByClassName('chart')[0];
const svgNS = "http://www.w3.org/2000/svg";

createSymbol('bear');

function createSymbol(trendClass) {
  let symbol = document.createElementNS(svgNS, 'g');
  symbol.classList.add('symbol');
  symbol.classList.add(trendClass);

  openEl = document.createElementNS('http://www.w3.org/2000/svg','line');
  openEl.classList.add('high-low');
  openEl.setAttribute('x1','105');
  openEl.setAttribute('x2','105');
  openEl.setAttribute('y1','5');
  openEl.setAttribute('y2','371');

  symbol.appendChild(openEl);
  graph.appendChild(symbol);
}