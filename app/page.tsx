// src/pages.tsx
'use client';
import React, {useEffect, useState} from 'react';
import FilterPanel from './components/FilterPanel';
import './styles/styles.scss';
import Footer from '@/app/components/Footer';
import Navbar from './components/navbar';
import {Filter} from "@/app/Redo/Filter";
import MeasuresGrid from "@/app/components/MeasuresGrid";
import {fetchMeasures} from "@/app/Redo/fetchData";
import {Measure} from "@/app/Redo/Measure";
import {Sector} from "@/app/Redo/Sector";
import {Focus} from "@/app/Redo/Focus";
import {FilterOpt} from "@/app/Redo/FilterOpt";

const Pages = () => {
    // All measures used only to create filteredMeasures
    const [measures, setMeasures] = useState<Measure[]>([]);
    // Filtered measures
    const [filteredMeasures, setFilteredMeasures] = useState<Measure[]>([]);
    //All unique filters for priorities, sectors, focuses and cities
    const [allFilters, setAllFilters] = useState<FilterOpt>({
        prioritys: [],
        sectors: [],
        focuses: [],
        cities: [],
    });
    //All active filters in sidepanel
    const [activeFilters, setActiveFilters] = useState<Filter>({
        prioritys: [],
        sectors: [],
        focuses: [],
    });
    //Fetch measures and set unique filters to allFilters
    useEffect(() => {
        fetchMeasures().then((measures) => {
            setMeasures(measures);
            // Parse all unique values for priorities, sectors, focuses and cities
            const priorities = [...new Set(measures.map((measure) => measure.priority))];
            const sectors = [...new Set(measures.map((measure) => measure.sector))];
            const focuses = [...new Set(measures.flatMap((measure) => measure.focuses))];
            const cities = [...new Set(measures.flatMap((measure) => measure.cities))];
            // Set data
            setAllFilters({
                prioritys: priorities,
                sectors: sectors,
                focuses: focuses,
                cities: cities,
            });
        });
    }, []);

    //When measures or activeFilters change, filter the measures
    useEffect(() => {
        const applyFilters = (measure: Measure) => {
            const priorityMatch = activeFilters.prioritys.length === 0 || activeFilters.prioritys.includes(measure.priority);
            const sectorMatch = activeFilters.sectors.length === 0 || activeFilters.sectors.includes(measure.sector);
            const focusMatch = activeFilters.focuses.length === 0 || activeFilters.focuses.some((focus) => measure.focuses.includes(focus));
            return priorityMatch && sectorMatch && focusMatch;
        };
        setFilteredMeasures(measures.filter(applyFilters))
    }, [measures, activeFilters]);


    // Handle changes from the FilterPanel for both priorities and sectors
    const changeFilters = (priorities: number[], sectors: Sector[], focuses: Focus[]) => {
        setActiveFilters({
            prioritys: priorities,
            sectors: sectors,
            focuses: focuses,
        });
    }

    return (
        <div className='d-flex flex-column flex-grow-1'>
            <Navbar/>
            <div className='app flex-grow-1'>
                <div className='sidebar'>
                    <FilterPanel filterOpt={allFilters} filters={activeFilters} onFilterChange={changeFilters}/>
                </div>
                <div className='main-content'>
                    <h1>TOP-MASSNAHMEN</h1>
                    <MeasuresGrid measureCards={filteredMeasures}/>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Pages;
