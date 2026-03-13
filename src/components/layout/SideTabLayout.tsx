'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { SideTab } from '../ui';

type SidebarItem = {
  id: string;
  name: string;
};

type SideTabLayoutProps = {
  sidebarItems: SidebarItem[];
  activeSidebarId: string;
  onSidebarSelect: (id: string) => void;
  children: React.ReactNode;
};

export const SideTabLayout = ({
  sidebarItems,
  activeSidebarId,
  onSidebarSelect,
  children,
}: SideTabLayoutProps) => {
  return (
    <div className="flex pt-1 gap-[24px] min-h-[calc(100vh-140px)]">
      <SideTab items={sidebarItems} activeId={activeSidebarId} onSelect={onSidebarSelect} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSidebarId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="flex-1 flex flex-col"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
