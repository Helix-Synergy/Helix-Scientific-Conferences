import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { easeSin } from 'd3-ease';

const WorldMap = ({ width, height }) => {
    const svgRef = useRef();
    const [geoData, setGeoData] = useState(null);
    const [tooltip, setTooltip] = useState({
        visible: false,
        x: 0,
        y: 0,
        content: null,
    });

    // Detailed office location data
    const officeLocations = {
        'United States of America': {
            name: 'Helix Conferences LLC',
            address: '45573 Shepard Drive, Suit#101, Sterling, Virginia-20164, USA'
        },
        'India': {
            name: 'Manjeera Trinity Corporate',
            address: '#402, 4th floor, KPHB, Hyderabad, Telangana 500072, India'
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
                const topojsonData = await response.json();
                
                const countries = topojson.feature(topojsonData, topojsonData.objects.countries);
                setGeoData(countries);
            } catch (error) {
                console.error("Error fetching map data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!geoData) return;

        const svg = d3.select(svgRef.current);
        const projection = d3.geoMercator().fitSize([width, height], geoData);
        const pathGenerator = d3.geoPath().projection(projection);

        svg.selectAll('*').remove();
        const g = svg.append('g');
        const glowingCountries = ['United States of America', 'India'];
        const pinData = [
            { name: "Hyderabad, India", coordinates: [78.4867, 17.3850] },
            { name: "Virginia, USA", coordinates: [-77.4360, 37.5407] }
        ];

        // Draw country paths
        const allPaths = g.selectAll('.country')
            .data(geoData.features)
            .join('path')
            .attr('class', 'country')
            .attr('d', pathGenerator)
            .attr('stroke', '#6b7280')
            .attr('stroke-width', 0.5)
            .attr('fill', d => {
                if (glowingCountries.includes(d.properties.name)) {
                    return '#009999';
                }
                return '#4b5563';
            });

        // Filter and apply country glow animation
        const glowingPaths = allPaths.filter(d => glowingCountries.includes(d.properties.name));
        
        const startCountryGlow = () => {
            glowingPaths.transition()
                .duration(1500)
                .ease(easeSin)
                .attr('fill', '#00ffff')
                .style('filter', 'drop-shadow(0 0 15px rgba(0, 255, 255, 0.8))')
                .transition()
                .duration(1500)
                .ease(easeSin)
                .attr('fill', '#009999')
                .style('filter', 'drop-shadow(0 0 5px rgba(0, 255, 255, 0.5))')
                .on('end', startCountryGlow);
        };
        startCountryGlow();

        // Add Tooltip Hover Events to the glowing countries
        glowingPaths
            .on('mouseover', (event, d) => {
                const countryName = d.properties.name;
                const locationData = officeLocations[countryName];
                
                if (locationData) {
                    setTooltip({
                        visible: true,
                        x: event.pageX + 10,
                        y: event.pageY + 10,
                        content: (
                            <div className="text-sm">
                                <p className="font-semibold text-white">{locationData.name}</p>
                                <p className="text-gray-300">{locationData.address}</p>
                            </div>
                        ),
                    });
                }
            })
            .on('mousemove', (event) => {
                setTooltip(prev => ({
                    ...prev,
                    x: event.pageX + 10,
                    y: event.pageY + 10,
                }));
            })
            .on('mouseout', () => {
                setTooltip({ visible: false, x: 0, y: 0, content: null });
            });


        // Draw and animate pins
        const pins = g.selectAll('.pin')
            .data(pinData)
            .join('circle')
            .attr('class', 'pin')
            .attr('cx', d => projection(d.coordinates)[0])
            .attr('cy', d => projection(d.coordinates)[1])
            .attr('r', 5) // Pin size
            .attr('fill', '#00ff00'); // Green color

        const startPinGlow = () => {
            pins.transition()
                .duration(1000)
                .ease(easeSin)
                .attr('r', 8) // Pulse outwards
                .style('filter', 'drop-shadow(0 0 10px rgba(0, 255, 0, 1))')
                .transition()
                .duration(1000)
                .ease(easeSin)
                .attr('r', 5) // Pulse inwards
                .style('filter', 'drop-shadow(0 0 5px rgba(0, 255, 0, 0.5))')
                .on('end', startPinGlow);
        };
        startPinGlow();

    }, [geoData, width, height]);

    return (
        <>
            <svg
                ref={svgRef}
                viewBox={`0 0 ${width} ${height}`}
                className="w-full h-full"
            />
            {tooltip.visible && (
                <div
                    className="absolute z-50 p-3 bg-gray-800 rounded-lg shadow-xl pointer-events-none transition-all duration-100 ease-out"
                    style={{
                        top: tooltip.y,
                        left: tooltip.x,
                    }}
                >
                    {tooltip.content}
                </div>
            )}
        </>
    );
};

export default WorldMap;