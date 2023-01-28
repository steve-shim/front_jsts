import View from '../core/view';

export interface Store {
    currentPage: number;
    feeds: NewsFeed[];
}

// 코드상에서 값을 변경하지 못하게 막으려면 readonly type을 추가한다
// 실수로 request하는 값을 변경해서 서버에 저장된 정보와 mismatch 방지
export interface News {
    readonly id: number;
    readonly time_ago: string;
    readonly title: string;
    readonly url: string;
    readonly user: string;
    readonly content: string;
}

// 공통 Type과 자신만의 Type을 intersection으로 공통 Type 제거
// extends News Type을 기반으로 새로운 키값도 추가 가능 
export interface NewsFeed extends News {
    readonly comments_count: number;
    readonly points: number;
    read?: boolean;
}

export interface NewsDetail extends News {
    readonly comments: NewsCommnet[];
}

export interface NewsCommnet extends News {
    // id: number;
    // user: string;
    // time_age: string;
    // content: string;
    readonly comments: NewsCommnet[];
    readonly level: number;
}

export interface RouteInfo {
    path: string;
    page: View;
}