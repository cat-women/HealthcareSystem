import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as RiIcons from 'react-icons/ri'
import { MdAccessibilityNew } from "react-icons/md";
import { BiBed } from "react-icons/bi";
import { BiGrid } from "react-icons/bi";
import { BiUser, BiLogOut } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
export const Sidebardata = [
    {
        id: 1,
        title: 'Dashboard',
        path: '/Dashboard',
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    },
    {
        id: 2,
        title: 'Doctor',
        path: '/Doctor',
        icon: <BiUser />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'All Doctor',
                path: 'doctors/alldoctors',

            },
            {
                title: 'Doctor Schedule',
                path: '/Doctor/Doctor Schedule',

            },

        ]
    },

    {
        id: 3,
        title: 'Patient',
        path: '/Patient',
        icon: <MdAccessibilityNew />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Patient List',
                path: '/Patient/Patient List',

            },
            {
                title: 'Add Patient',
                path: '/Patient/addAppointment',

            }

        ]
    },
    {
        id: 4,
        title: 'Accidents',
        path: '/Accients',
        icon: <BiBed />

    },
    {
        id: 5,
        title: 'Department',
        path: '/Department',
        icon: <BiGrid />,
        subNav: [
            {
                title: 'Outpatient department (OPD)',
                path: '/Department/opd',

            },
            {
                title: 'Radiology Department (X-ray)',
                path: '/Department/Radiology',

            },
            {
                title: 'Counseling',
                path: '/Department/Counseling',

            },
            
            {
                title: 'Physiotherapy',
                path: '/Department/physiotherapy',

            }

        ]
    },
    {
        id: 6,
        title: 'Make Appointment',
        path: 'makeappointment',
        icon: <AiFillEdit />,

    },
    {
        id: 7,
        title: 'About us',
        path: 'aboutus',

    },{
        id:8,
        title:'Patient Profile',
        path: 'PatientProfile'
    },
    {
        id:9,
        title:'Home',
        path:'/'
    }

];  
