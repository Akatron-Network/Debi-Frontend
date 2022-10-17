import React from 'react'

import Workspace from '../components/Workspace';
import { Outlet } from 'react-router-dom';

export default function WorkspaceLayout({ setCollections , collections }) {
  return (
  
    <>
			<Outlet />
			<Workspace collections={collections} setCollections={setCollections} />
    </>
  )
}
