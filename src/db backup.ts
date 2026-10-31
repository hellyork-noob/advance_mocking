import Dexie, {type Table} from 'dexie';
export type SectionResult={subject:string;correct:number;incorrect:number;unattempted:number;score:number;maxScore:number};
export type Mock={sections?:SectionResult[];id?:number;exam:string;title:string;date:string;score:number;maxScore:number;correct:number;incorrect:number;unattempted:number;subject:string;url?:string;timeMinutes?:number};
export type ExamSectionConfig={name:string;questions:number;positive:number;negative:number;maxMarks:number};
export type CustomExamProfile={id?:number;name:string;tier:string;key:string;durationMinutes:number;targetScore?:number;subjectTargets?:Record<string,number>;sections:ExamSectionConfig[];createdAt:string};
export type Exam={id?:number;name:string;date:string};
export type Playlist={id?:number;title:string;url:string;completed:boolean};
class AnalyzerDB extends Dexie{mocks!:Table<Mock,number>;exams!:Table<Exam,number>;playlists!:Table<Playlist,number>;customExamProfiles!:Table<CustomExamProfile,number>;constructor(){super('advance_analyzer_v2_clean_phase5a');this.version(1).stores({mocks:'++id,exam,date,subject',exams:'++id,date',playlists:'++id'});this.version(2).stores({mocks:'++id,exam,date,subject',exams:'++id,date',playlists:'++id',customExamProfiles:'++id,&key'});}}
export const db=new AnalyzerDB();
export async function exportBackup(){const payload={app:'Advance Analyzer v2',schema:2,exportedAt:new Date().toISOString(),mocks:await db.mocks.toArray(),exams:await db.exams.toArray(),playlists:await db.playlists.toArray(),customExamProfiles:await db.customExamProfiles.toArray()};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='advance-analyzer-v2-clean-phase5a-backup.json';a.click();URL.revokeObjectURL(url);}
