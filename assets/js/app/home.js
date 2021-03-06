jQuery(function ($) {
    $('.easy-pie-chart.percentage').each(function () {
        var $box = $(this).closest('.infobox');
        var barColor = $(this).data('color') || (!$box.hasClass('infobox-dark') ? $box.css('color') : 'rgba(255,255,255,0.95)');
        var trackColor = barColor == 'rgba(255,255,255,0.95)' ? 'rgba(255,255,255,0.25)' : '#E2E2E2';
        var size = parseInt($(this).data('size')) || 50;
        $(this).easyPieChart({
            barColor: barColor,
            trackColor: trackColor,
            scaleColor: false,
            lineCap: 'butt',
            lineWidth: parseInt(size / 10),
            animate: ace.vars['old_ie'] ? false : 1000,
            size: size
        });
    })

    $('.sparkline').each(function () {
        var $box = $(this).closest('.infobox');
        var barColor = !$box.hasClass('infobox-dark') ? $box.css('color') : '#FFF';
        $(this).sparkline('html',
            {
                tagValuesAttribute: 'data-values',
                type: 'bar',
                barColor: barColor,
                chartRangeMin: $(this).data('min') || 0
            });
    });


    //flot chart resize plugin, somehow manipulates default browser resize event to optimize it!
    //but sometimes it brings up errors with normal resize event handlers
    $.resize.throttleWindow = false;

    var placeholder = $('#piechart-placeholder').css({ 'width': '90%', 'min-height': '150px' });
    var data = [
        { label: "social networks", data: 38.7, color: "#68BC31" },
        { label: "search engines", data: 24.5, color: "#2091CF" },
        { label: "ad campaigns", data: 8.2, color: "#AF4E96" },
        { label: "direct traffic", data: 18.6, color: "#DA5430" },
        { label: "other", data: 10, color: "#FEE074" }
    ]
    function drawPieChart(placeholder, data, position) {
        $.plot(placeholder, data, {
            series: {
                pie: {
                    show: true,
                    tilt: 0.8,
                    highlight: {
                        opacity: 0.25
                    },
                    stroke: {
                        color: '#fff',
                        width: 2
                    },
                    startAngle: 2
                }
            },
            legend: {
                show: true,
                position: position || "ne",
                labelBoxBorderColor: null,
                margin: [-30, 15]
            }
            ,
            grid: {
                hoverable: true,
                clickable: true
            }
        })
    }
    drawPieChart(placeholder, data);

    /**
    we saved the drawing function and the data to redraw with different position later when switching to RTL mode dynamically
    so that's not needed actually.
    */
    placeholder.data('chart', data);
    placeholder.data('draw', drawPieChart);


    //pie chart tooltip example
    var $tooltip = $("<div class='tooltip top in'><div class='tooltip-inner'></div></div>").hide().appendTo('body');
    var previousPoint = null;

    placeholder.on('plothover', function (event, pos, item) {
        if (item) {
            if (previousPoint != item.seriesIndex) {
                previousPoint = item.seriesIndex;
                var tip = item.series['label'] + " : " + item.series['percent'] + '%';
                $tooltip.show().children(0).text(tip);
            }
            $tooltip.css({ top: pos.pageY + 10, left: pos.pageX + 10 });
        } else {
            $tooltip.hide();
            previousPoint = null;
        }

    });

    /////////////////////////////////////

})