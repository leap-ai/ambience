import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const moods = ['Cosmic', 'Natural', 'Urban', 'Artistic', 'Serene'] as const;
type Mood = (typeof moods)[number];

export default function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState<Mood>(moods[0]);

  const handleMoodChange = (mood: Mood): void => {
    setSelectedMood(mood);
  };

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<FaChevronDown />}>
        {selectedMood}
      </MenuButton>
      <MenuList>
        {moods.map((mood) => (
          <MenuItem key={mood} onClick={() => handleMoodChange(mood)}>
            {mood}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
