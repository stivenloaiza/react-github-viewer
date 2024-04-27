import {useState} from 'react';
import {TextField, IconButton, Box} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface LanguageInputProps {
    onLanguageChange: (language: string) => void;
    currentLanguage: string;
}

export function LanguageInput({ onLanguageChange, currentLanguage }: LanguageInputProps) {
    const [language, setLanguage] = useState(currentLanguage);

    const handleAddClick = () => {
        onLanguageChange(language);
        setLanguage('');
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <TextField
                fullWidth
                size="small"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="Filtra por lenguaje"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && language) {
                        handleAddClick();
                        e.preventDefault();
                    }else {
                        e.stopPropagation()
                    }
                }}
                onClick={(e) => e.stopPropagation()}
                onFocus={(e) => e.stopPropagation()}

            />
            <IconButton edge="end" onClick={handleAddClick} disabled={!language}>
                <AddCircleOutlineIcon />
            </IconButton>
        </Box>
    );
}