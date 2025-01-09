"use client";

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';
import Link from 'next/link';
import { format } from 'date-fns';

interface TimelineProps {
  timeline: Record<string, Record<string, any[]>>;
}

export function TimelineView({ timeline }: TimelineProps) {
  const [expandedYears, setExpandedYears] = useState<Record<string, boolean>>({});

  const toggleYear = (year: string) => {
    setExpandedYears(prev => ({
      ...prev,
      [year]: !prev[year]
    }));
  };

  return (
    <div className="space-y-4">
      {Object.entries(timeline)
        .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
        .map(([year, months]) => (
          <Card key={year} className="p-4">
            <button
              onClick={() => toggleYear(year)}
              className="w-full flex items-center justify-between text-lg font-semibold mb-2"
            >
              <span>{year}</span>
              <span className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {Object.values(months).flat().length} posts
                </span>
                {expandedYears[year] ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </span>
            </button>
            
            {expandedYears[year] && (
              <div className="mt-4 space-y-4">
                {Object.entries(months)
                  .sort(([monthA], [monthB]) => {
                    const dateA = new Date(`${monthA} 1, ${year}`);
                    const dateB = new Date(`${monthB} 1, ${year}`);
                    return dateB.getTime() - dateA.getTime();
                  })
                  .map(([month, posts]) => (
                    <div key={month} className="pl-4 border-l-2 border-muted">
                      <h4 className="text-md font-medium mb-2">{month}</h4>
                      <div className="space-y-2">
                        {posts.map((post: any) => (
                          <Link 
                            key={post.slug} 
                            href={`/posts/${post.slug}`}
                            className="block hover:bg-muted p-2 rounded-md transition-colors"
                          >
                            <div className="flex justify-between items-center">
                              <span>{post.title}</span>
                              <span className="text-sm text-muted-foreground">
                                {format(new Date(post.date), 'MMM d')}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </Card>
        ))}
    </div>
  );
}